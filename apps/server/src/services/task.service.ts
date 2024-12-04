import { TaskStatus } from "@prisma/client";
import prisma from "../db/prismaClient.js"
import { ApiError } from "../utils/ApiError.js";


export const addTask = async(title: string, description: string, status: TaskStatus, userId: string) => {
    const task = await prisma.task.create({
        data: {
            title,
            description,
            status,
            ownerId: userId,
        }
    });
    return task;
};

export const getTask = async(taskId: string, userId: string) => {
    const task = await prisma.task.findUnique({
        where: {id: taskId, ownerId: userId},
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            ownerId: true,
            isPublic: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    if(!task){
        throw new ApiError(400, "Task not found with given task Id")
    };

    return task;
};

export const getTasks = async(userId: string) => {
    const tasks = await prisma.task.findMany({
        where: {ownerId: userId},
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            ownerId: true,
            isPublic: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    if(!tasks){
        throw new ApiError(400, "Tasks not found for current user ")
    };
    
    return tasks;
};

export const getTasksByStatus = async(status: TaskStatus, userId: string) => {
    const tasks = await prisma.task.findMany({
        where: {ownerId: userId, status: status},
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            ownerId: true,
            isPublic: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    if(!tasks){
        throw new ApiError(400, "Tasks not found for current user with provided status")
    };
    
    return tasks;
};


export const updateTaskStatus = async (taskId: string, status: TaskStatus, userId: string) => {
    const task = await prisma.task.findUnique({
        where: {id: taskId, ownerId: userId},
        select: {
            id: true,
            status: true
        }
    });

    if(!task || task.status === status){
        throw new ApiError(400, "Task not found, or task is already in provided status")
    }
    
    const updatedStatus = await prisma.task.update({
        where: {id: taskId, ownerId: userId},
        data: {
            status: status,
        }
    });
    return updatedStatus;
};

export const deleteTask = async (taskId: string, userId: string) => {
    const task = await prisma.task.findUnique({
        where: {id: taskId, ownerId: userId},
        select: {
            id: true,
            status: true
        }
    });

    if(!task){
        throw new ApiError(400, "Task not found with given taskId");
    }

    const deletedTask = await prisma.task.delete({
        where: {id: taskId, ownerId: userId}
    });
    return deletedTask;
};

