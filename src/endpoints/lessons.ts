
import { D1CreateEndpoint, D1ReadEndpoint, D1ListEndpoint } from "chanfana";
import { z } from "zod";


// Define the Lesson Model
const LessonModel = z.object({
    id: z.number(),
    created: z.string().datetime(),
    title: z.string().min(3).max(255),
});

// Define the Meta object for Lesson
const lessonMeta = {
    model: {
        schema: LessonModel,
        primaryKeys: ['id'],
        tableName: 'lessons', // Table name in D1 database
    },
};

export class GetLesson extends D1ReadEndpoint { _meta = lessonMeta; dbName = "DB"; }
export class ListLessons extends D1ListEndpoint { _meta = lessonMeta; dbName = "DB"; }

// with create, we want to accept free form JSON for now 
const CreateModel = z.object({
    title: z.string().min(3).max(255),
}).catchall(z.unknown());
const createMeta = {
    model: {
        schema: CreateModel,
        tableName: 'lessons',
    },
};
export class CreateLesson extends D1CreateEndpoint {
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

