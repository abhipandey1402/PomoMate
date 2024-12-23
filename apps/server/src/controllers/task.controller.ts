import { asyncHandler } from "../utils/AsyncHandler.js";
import * as taskService from "../services/task.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add task with all details
export const addTask = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { title, description, totalTimeRequired, dueDate } = req.body;
    const userId = req.user.id;

    const task = await taskService.addTask(title, description, userId, totalTimeRequired, dueDate);

    res.status(201).json(
        new ApiResponse(201, task, "Task created successfully")
    );
});

// Get single task
export const getTask = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await taskService.getTask(taskId, userId);

    res.status(200).json(
        new ApiResponse(200, task, "Task fetched successfully")
    );
});

// Get tasks
export const getTasks = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;

    const tasks = await taskService.getTasks(userId);

    res.status(200).json(
        new ApiResponse(200, tasks, "Tasks fetched successfully")
    );
});

// Get tasks by status
export const getTasksByStatus = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { status } = req.params;
    const userId = req.user.id;

    const tasks = await taskService.getTasksByStatus(status, userId);

    res.status(200).json(
        new ApiResponse(200, tasks, "Tasks fetched successfully")
    );
});


// Get Current task
export const getCurrentTask = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;

    const currentTask = await taskService.getCurrentTask(userId);

    res.status(200).json(
        new ApiResponse(200, currentTask, "Current task retrieved successfully")
    );
});

// Update task status
export const updateTaskStatus = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { taskId, status } = req.params;
    const userId = req.user.id;

    const updatedTask = await taskService.updateTaskStatus(taskId, status, userId);

    res.status(200).json(
        new ApiResponse(200, updatedTask, "Task status updated successfully")
    );
});

// Delete task
export const deleteTask = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { taskId } = req.params;
    const userId = req.user.id;

    const deletedTask = await taskService.deleteTask(taskId, userId);

    res.status(200).json(
        new ApiResponse(200, deletedTask, "Task deleted successfully")
    );
});

// Mark task as starred
export const toggleTaskStarred = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { taskId } = req.params;
    const userId = req.user.id;

    const updatedTask = await taskService.toggleTaskStarred(taskId, userId);

    res.status(200).json(
        new ApiResponse(200, updatedTask, "Task starred status updated successfully")
    );
});

// Start/Stop timer
export const manageTaskTimer = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { taskId, action } = req.params; // 'start' or 'stop'
    const userId = req.user.id;

    const updatedTask = await taskService.manageTaskTimer(taskId, userId, action);

    res.status(200).json(
        new ApiResponse(200, updatedTask, `Task timer ${action}ed successfully`)
    );
});

// Share task with users
export const shareTaskWithUsers = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { taskId } = req.params;
    const { userIds } = req.body; // userIds array of users to share the task with
    const userId = req.user.id;

    const updatedTask = await taskService.shareTaskWithUsers(taskId, userId, userIds);

    res.status(200).json(
        new ApiResponse(200, updatedTask, "Task shared with users successfully")
    );
});