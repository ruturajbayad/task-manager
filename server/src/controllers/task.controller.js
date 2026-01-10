import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";

// Create a new task
const createTask = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        throw new ApiError(400, "Title is required");
    }

    const task = await Task.create({
        title: title.trim(),
        status: "todo"
    });

    return res.status(201).json(
        new ApiResponse(201, task, "Task created successfully")
    );
});

// Get all tasks
const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, tasks, "Tasks fetched successfully")
    );
});

// Update task status
const updateTaskStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        throw new ApiError(400, "Status is required");
    }

    const task = await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(200, task, "Task status updated successfully")
    );
});

// Delete a task
const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Task deleted successfully")
    );
});

export {
    createTask,
    getAllTasks,
    updateTaskStatus,
    deleteTask
};
