
import { D1CreateEndpoint, D1ReadEndpoint, D1ListEndpoint } from "chanfana";
import { z } from "zod";


// Define the Course Model
const CourseModel = z.object({
    id: z.number(),
    created: z.string().datetime(),
    name: z.string().min(3).max(255),
});

// Define the Meta object for Course
const courseMeta = {
    model: {
        schema: CourseModel,
        primaryKeys: ['id'],
        tableName: 'courses', // Table name in D1 database
    },
};

export class GetCourse extends D1ReadEndpoint { _meta = courseMeta; dbName = "DB"; }
export class ListCourses extends D1ListEndpoint { _meta = courseMeta; dbName = "DB"; }

// with create, we want to accept free form JSON for now 
const CreateModel = z.object({
    name: z.string().min(3).max(255),
}).catchall(z.unknown());
const createMeta = {
    model: {
        schema: CreateModel,
        tableName: 'courses',
    },
};
export class CreateCourse extends D1CreateEndpoint {
    _meta = createMeta;
    dbName = "DB";

    async create(data: z.infer<typeof CreateModel>) {
        let inserted;
        let serialized;
        try {
            serialized = JSON.stringify(data)
        } catch (e: any) {
            // capture exception when stringify encounters BigInt/circular
            serialized = JSON.stringify(e, Object.getOwnPropertyNames(e))
        }
        try {
          const result = await this.getDBBinding()
            .prepare(
              `INSERT INTO ${this.meta.model.tableName} (rawdata) VALUES (?) RETURNING *`,
            )
            .bind(serialized)
            .all();

          inserted = result.results[0] as O<typeof this.meta>;
        } catch (e: any) {
          if (e.message.includes("UNIQUE constraint failed")) {
            const constraintMessage = e.message.split("UNIQUE constraint failed:")[1].split(":")[0].trim();
            if (this.constraintsMessages[constraintMessage]) {
              throw this.constraintsMessages[constraintMessage];
            }
          }

          throw new ApiException(e.message);
        }
        return inserted;
    }
}

