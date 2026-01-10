import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//routes import
import taskRouter from "./routes/task.routes.js"

//routes declaration
app.use("/api/v1/tasks", taskRouter)

export { app }