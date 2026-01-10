import { Router } from "express";
import {
    createTask,
    getAllTasks,
    updateTaskStatus,
    deleteTask
} from "../controllers/task.controller.js";

const router = Router();

router.route("/").post(createTask);
router.route("/").get(getAllTasks);
router.route("/:id/status").patch(updateTaskStatus);
router.route("/:id").delete(deleteTask);

export default router;