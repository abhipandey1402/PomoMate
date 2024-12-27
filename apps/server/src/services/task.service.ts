import { Task } from "../models/task.model.js";
import { TaskShare } from "../models/taskShare.model.js";
import { ApiError } from "../utils/ApiError.js";

export const addTask = async (title: string, description: string, userId: string, totalTimeRequired: number, dueDate: Date) => {
    const task = new Task({
        title,
        description,
        status: "notStarted",
        ownerId: userId,
        totalTimeRequired,
        dueDate,
        timeWorked: 0,
        timeWorkedToday: 0,
        remainingTime: totalTimeRequired,
        isTaskStarred: false,
        isBeingWorkedOn: false,
    });

    await task.save();
    return task;
};

export const getTask = async (taskId: string, userId: string) => {
    const task = await Task.findOne({
        _id: taskId,
        ownerId: userId,
    });

    if (!task) {
        throw new ApiError(400, "Task not found with given task Id");
    }

    return task;
};

export const getTasks = async (userId: string) => {
    const tasks = await Task.find({
        ownerId: userId
    });

    if (!tasks || tasks.length === 0) {
        throw new ApiError(400, "Tasks not found for current user");
    }

    return tasks;
};

export const getTasksByStatus = async (status: string, userId: string) => {
    const tasks = await Task.find({
        ownerId: userId,
        status: status
    });

    if (!tasks || tasks.length === 0) {
        throw new ApiError(400, "Tasks not found for current user with provided status");
    }

    return tasks;
};

export const getCurrentTask = async (userId: string) => {
    const currentTask = await Task.findOne({
        ownerId: userId,
        isBeingWorkedOn: true
    }).select("id title description timerStartTime timeWorked timeWorkedToday remainingTime totalTimeRequired");

    if (!currentTask) {
        throw new ApiError(400, "Tasks not found for current user with provided status");
    }

    return currentTask;
};

export const updateTaskStatus = async (taskId: string, status: string, userId: string) => {
    const task = await Task.findOne({
        _id: taskId,
        ownerId: userId
    });

    if (!task || task.status === status) {
        throw new ApiError(400, "Task not found, or task is already in provided status");
    }

    task.status = status;
    await task.save();
    return task;
};

export const deleteTask = async (taskId: string, userId: string) => {
    const task = await Task.findOne({
        _id: taskId,
        ownerId: userId
    });

    if (!task) {
        throw new ApiError(400, "Task not found with given taskId");
    }

    await task.deleteOne();
    return task;
};

export const toggleTaskStarred = async (taskId: string, userId: string) => {
    const task = await Task.findOne({
        _id: taskId,
        ownerId: userId
    });

    if (!task) {
        throw new ApiError(400, "Task not found with given taskId");
    }

    task.isTaskStarred = !task.isTaskStarred;
    await task.save();
    return task;
};

export const manageTaskTimer = async (taskId: string, userId: string, action: "start" | "stop") => {
    const task = await Task.findOne({
        _id: taskId,
        ownerId: userId,
    });

    if (!task) {
        throw new ApiError(400, "Task not found with given taskId");
    }

    if (action === "start") {
        const ongoingTask = await Task.findOne({
            ownerId: userId,
            isBeingWorkedOn: true,
        });

        if (ongoingTask) {
            throw new ApiError(400, "Another task is currently being worked on");
        }

        if (task.remainingTime <= 0) {
            throw new ApiError(400, "No remaining time left for this task");
        }

        task.isBeingWorkedOn = true;
        task.timerStartTime = new Date();
        await task.save();

        return task;
    } else if (action === "stop") {
        if (!task.isBeingWorkedOn) {
            throw new ApiError(400, "Task is not currently being worked on");
        }

        const now = new Date();

        // Ensure task.timerStartTime is defined before calculating time difference
        if (!task.timerStartTime) {
            throw new ApiError(400, "Task timer start time is not set");
        }

        const timeWorkedInSeconds = Math.floor((now.getTime() - new Date(task.timerStartTime).getTime()) / 1000);
        const newTimeWorkedToday = (task.timeWorkedToday || 0) + timeWorkedInSeconds;
        const newRemainingTime = task.remainingTime > 0 ? Math.max(0, task.remainingTime - timeWorkedInSeconds) : 0;

        task.isBeingWorkedOn = false;
        task.timerEndTime = now;
        task.timeWorked += timeWorkedInSeconds;
        task.timeWorkedToday = newTimeWorkedToday;
        task.remainingTime = newRemainingTime;

        await task.save();
        return task;
    }

    throw new ApiError(400, "Invalid action");
};


export const shareTaskWithUsers = async (taskId: string, userId: string, userIds: string[]) => {
    const task = await Task.findOne({
        _id: taskId,
        ownerId: userId
    });

    if (!task) {
        throw new ApiError(400, "Task not found with given taskId");
    }

    // Assuming a TaskShare model exists
    const taskShares = userIds.map(userId => ({ taskId, userId }));
    await TaskShare.create(taskShares);  // Assuming TaskShare model exists

    const sharedUsers = await TaskShare.find({
        taskId: taskId
    }).populate("user");

    return {
        task,
        sharedUsers
    };
};
