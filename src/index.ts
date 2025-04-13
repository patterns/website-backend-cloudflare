import { fromHono } from "chanfana";
import { Hono } from "hono";

//import { TaskDelete } from "./endpoints/taskDelete";
//import { TaskFetch } from "./endpoints/taskFetch";
import { CreateUser, GetUser, ListUsers } from "./endpoints/users";
import { CreateLesson, GetLesson, ListLessons } from "./endpoints/lessons";
import { CreateCourse, GetCourse, ListCourses } from "./endpoints/courses";

type Bindings = {
 DB: D1Database
 DEMO_API_KEY: string
}
// Start a Hono app
const app = new Hono<{ Bindings: Bindings }>()

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// API Key Authentication Middleware
const apiKeyAuthMiddleware = async (c, next) => {
    const apiKey = c.req.header('X-API-Key');
    if (!apiKey || apiKey !== c.env.DEMO_API_KEY) { // Validate against API_KEY environment variable
        throw new HTTPException(401, { message: 'Invalid API Key.' })
    }
    await next();
};

// Register OpenAPI endpoints
//openapi.get("/api/tasks/:taskSlug", TaskFetch);
//openapi.delete("/api/tasks/:taskSlug", TaskDelete);
openapi.get("/api/users", apiKeyAuthMiddleware, ListUsers);
openapi.post("/api/users", CreateUser);
openapi.get("/api/users/:id", GetUser);
openapi.get("/api/lessons", ListLessons);
openapi.post("/api/lessons", CreateLesson);
openapi.get("/api/lessons/:id", GetLesson);
openapi.get("/api/courses", ListCourses);
openapi.post("/api/courses", CreateCourse);
openapi.get("/api/courses/:id", GetCourse);

// Export the Hono app
export default app;
