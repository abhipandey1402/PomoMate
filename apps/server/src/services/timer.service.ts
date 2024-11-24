import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";

interface StartTimerInput {
    userId: string;
    duration: number;
    breakTime: number;
}

export const startTimer = async (data: StartTimerInput) => {
    const { duration, breakTime, userId } = data;

    const timer = await prisma.timer.create({
        data: {
            userId,
            duration,
            breakTime,
            remainingTime: duration
        }
    })
    return timer;
}

export const getTimer = async (timerId: string, userId: string) => {
    const timer = await prisma.timer.findUnique({
        where: {id: timerId, userId: userId},
        select: {
            id: true,
            user: true,
            userId: true,
            duration: true,
            breakTime: true,
            remainingTime: true,
            status: true,
            completed: true,
            createdAt: true,
        }
    });

    if(!timer) {
        throw new ApiError(400, "Timer not found");
    }

    return timer;
}

export const pauseTimer = async (timerId: string, remainingTime: number, userId: string) => {
    const timer = await prisma.timer.findUnique({
        where: {id: timerId, userId: userId},
        select: {id: true, status: true, remainingTime: true, createdAt: true, duration: true},
    });

    if(!timer || timer.status !== "active"){
        throw new ApiError(400, "Timer not found or not active");
    }

    const updatedTimer = await prisma.timer.update({
        where: {id: timerId, userId: userId},
        data: {
            status: "paused",
            remainingTime: remainingTime,
        }
    });
    return updatedTimer;
}

export const resumeTimer = async (timerId: string, userId: string) => {
    const timer = await prisma.timer.findUnique({
        where: {id: timerId, userId: userId},
        select: {id: true, status: true}
    })

    if(!timer || timer.status != "paused"){
        throw new ApiError(400, "Timer not found or not paused");
    }

    const updatedTimer = await prisma.timer.update({
        where: {id: timerId, userId: userId},
        data: {
            status: "active",
        }
    });

    return updatedTimer;
}

export const completeTimer = async (timerId: string, userId: string) => {
    const timer = await prisma.timer.findUnique({
        where: {id: timerId, userId: userId},
        select: {id: true, status: true}
    })

    if(!timer || timer.status == "completed"){
        throw new ApiError(400, "Timer not found or not in the state to be completed");
    }

    const completedTimer = await prisma.timer.update({
        where: {id: timerId, userId: userId},
        data: {
            status: "completed",
            completed: true,
            remainingTime: 0,
        }
    });
    return completedTimer;
}

export const clearTimer = async (timerId: string, userId: string) => {
    const timer = await prisma.timer.findUnique({
        where: {id: timerId, userId: userId},
        select: {id: true, status: true}
    });

    if(!timer || timer.status == "completed"){
        throw new ApiError(400, "Timer not found or it's completed");
    }
    
    const clearedTimer = await prisma.timer.delete({
        where: {id: timerId, userId: userId}
    })

    return "Timer deleted successfully"
}