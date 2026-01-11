import express from "express"
import cors from "cors"

const app = express()

app.use(
  cors({
    origin: [
      "https://task-manager-rosy-alpha.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString()
    });
});

//routes import
import taskRouter from "./routes/task.routes.js"

//routes declaration
app.use("/api/v1/tasks", taskRouter)

export { app }