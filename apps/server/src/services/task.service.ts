import { TaskStatus } from "@prisma/client";
import prisma from "../db/prismaClient.js"
import { ApiError } from "../utils/ApiError.js";

export const addTask = async (title: string, description: string, userId: string, totalTimeRequired: number, dueDate: Date) => {
    const task = await prisma.task.create({
        data: {
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
        }
    });
    return task;
};

export const getTask = async (taskId: string, userId: string) => {
    const task = await prisma.task.findUnique({
        where: { id: taskId, ownerId: userId },
    });

    if (!task) {
        throw new ApiError(400, "Task not found with given task Id")
    };

    return task;
};

export const getTasks = async (userId: string) => {
    const tasks = await prisma.task.findMany({
        where: { ownerId: userId },
    });

    if (!tasks) {
        throw new ApiError(400, "Tasks not found for current user ")
    };

    return tasks;
};

export const getTasksByStatus = async (status: TaskStatus, userId: string) => {
    const tasks = await prisma.task.findMany({
        where: { ownerId: userId, status: status },
    });

    if (!tasks) {
        throw new ApiError(400, "Tasks not found for current user with provided status")
    };

    return tasks;
};


export const getCurrentTask = async (userId: string) => {
    const currentTask = await prisma.task.findFirst({
        where: { ownerId: userId, isBeingWorkedOn: true },
        select: {
            id: true,
            title: true,
            description: true,
            timerStartTime: true,
            timeWorked: true,
            timeWorkedToday: true,
            remainingTime: true,
            totalTimeRequired: true,
        },
    });

    if (!currentTask) {
        throw new ApiError(400, "Tasks not found for current user with provided status")
    };

    return currentTask;
};


export const updateTaskStatus = async (taskId: string, status: TaskStatus, userId: string) => {
    const task = await prisma.task.findUnique({
        where: { id: taskId, ownerId: userId },
        select: {
            id: true,
            status: true
        }
    });

    if (!task || task.status === status) {
        throw new ApiError(400, "Task not found, or task is already in provided status")
    }

    const updatedStatus = await prisma.task.update({
        where: { id: taskId, ownerId: userId },
        data: {
            status: status,
        }
    });
    return updatedStatus;
};

export const deleteTask = async (taskId: string, userId: string) => {
    const task = await prisma.task.findUnique({
        where: { id: taskId, ownerId: userId },
        select: {
            id: true,
            status: true
        }
    });

    if (!task) {
        throw new ApiError(400, "Task not found with given taskId");
    }

    const deletedTask = await prisma.task.delete({
        where: { id: taskId, ownerId: userId }
    });
    return deletedTask;
};

export const toggleTaskStarred = async (taskId: string, userId: string) => {
    const task = await prisma.task.findUnique({
        where: { id: taskId, ownerId: userId },
    });

    if (!task) {
        throw new ApiError(400, "Task not found with given taskId");
    }

    const updatedTask = await prisma.task.update({
        where: { id: taskId, ownerId: userId },
        data: { isTaskStarred: !task.isTaskStarred },
    });

    return updatedTask;
};

export const manageTaskTimer = async (taskId: string, userId: string, action: "start" | "stop") => {
    const task = await prisma.task.findUnique({
        where: { id: taskId, ownerId: userId },
    });

    if (!task) {
        throw new ApiError(400, "Task not found with given taskId");
    }

    if (action === "start") {
        // Ensure no other task is being worked on
        const ongoingTask = await prisma.task.findFirst({
            where: { ownerId: userId, isBeingWorkedOn: true },
        });

        if (ongoingTask) {
            throw new ApiError(400, "Another task is currently being worked on");
        }

        // Calculate the remaining time and check if it's exceeded
        if (task.remainingTime !== null && task.remainingTime <= 0) {
            throw new ApiError(400, "No remaining time left for this task");
        }

        // Start timer
        const updatedTask = await prisma.task.update({
            where: { id: taskId, ownerId: userId },
            data: {
                isBeingWorkedOn: true,
                timerStartTime: new Date(),
            },
        });

        return updatedTask;
    } else if (action === "stop") {
        if (!task.isBeingWorkedOn) {
            throw new ApiError(400, "Task is not currently being worked on");
        }

        const now = new Date();

        // Calculate time worked since the timer started in seconds
        const timeWorkedInSeconds = Math.floor((now.getTime() - new Date(task.timerStartTime!).getTime()) / 1000);

        // Update timeWorkedToday and remainingTime in seconds
        const newTimeWorkedToday = (task.timeWorkedToday || 0) + timeWorkedInSeconds;
        const newRemainingTime = task.remainingTime !== null
            ? Math.max(0, task.remainingTime - timeWorkedInSeconds)
            : 0;

        // Stop the timer and update the time worked
        const updatedTask = await prisma.task.update({
            where: { id: taskId, ownerId: userId },
            data: {
                isBeingWorkedOn: false,
                timerEndTime: now,
                timeWorked: { increment: timeWorkedInSeconds },
                timeWorkedToday: newTimeWorkedToday,
                remainingTime: newRemainingTime,
            },
        });

        return updatedTask;
    }

    throw new ApiError(400, "Invalid action");
};


export const shareTaskWithUsers = async (taskId: string, userId: string, userIds: string[]) => {
    const task = await prisma.task.findUnique({
        where: { id: taskId, ownerId: userId },
    });

    if (!task) {
        throw new ApiError(400, "Task not found with given taskId");
    }

    // Assuming a separate TaskShare model exists to link tasks with users
    const taskShares = userIds.map(userId => ({
        taskId,
        userId
    }));

    // Create TaskShare entries for each user
    await prisma.taskShare.createMany({
        data: taskShares
    });

    // Fetch all users who have access to the task (including the owner)
    const sharedUsers = await prisma.taskShare.findMany({
        where: { taskId: taskId },
        include: {
            user: true,  // Include user details in the result
        }
    });

    // Return task with the list of shared users
    return {
        task,
        sharedUsers
    };
};