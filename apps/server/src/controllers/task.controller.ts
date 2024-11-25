import { asyncHandler } from "../utils/AsyncHandler.js";
import * as taskService from "../services/task.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const addTask = asyncHandler(async(req: any, res: any): Promise<void> => {
    const { title, description, status } = req.body;
    const userId = req.user.id;

    const task = await taskService.addTask(title, description, status, userId);

    res.status(201).json(
        new ApiResponse(201, task, "Task created successfully")
    )
});

export const getTask = asyncHandler(async(req: any, res: any): Promise<void> => {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await taskService.getTask(taskId, userId);

    res.status(200).json(
        new ApiResponse(200, task, "Task fetched successfully")
    )
});

export const getTasks = asyncHandler(async(req: any, res: any): Promise<void> => {
    const userId = req.user.id;

    const tasks = await taskService.getTasks(userId);

    res.status(200).json(
        new ApiResponse(200, tasks, "Tasks fetched successfully")
    )
});

export const getTasksByStatus = asyncHandler(async(req: any, res: any): Promise<void> => {
    const { status } = req.params;
    const userId = req.user.id;

    const tasks = await taskService.getTasksByStatus(status, userId);

    res.status(200).json(
        new ApiResponse(200, tasks, "Tasks fetched successfully")
    )
});

export const updateTaskStatus = asyncHandler(async(req: any, res: any): Promise<void> => {
    const { taskId, status } = req.params;
    const userId = req.user.id;

    const updatedTask = await taskService.updateTaskStatus(taskId, status, userId);

    res.status(200).json(
        new ApiResponse(200, updatedTask, "Task status updated successfully")
    )
});

export const deleteTask = asyncHandler(async(req: any, res: any): Promise<void> => {
    const { taskId } = req.params;
    const userId = req.user.id;

    const deletedTask = await taskService.deleteTask(taskId, userId);

    res.status(200).json(
        new ApiResponse(200, deletedTask, "Task deleted successfully")
    )
});