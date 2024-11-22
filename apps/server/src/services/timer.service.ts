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

export const pauseTimer = async (timerId: string, remainingTime: number, userId: string) => {
    const timer = await prisma.timer.findUnique({
        where: {id: timerId},
        select: {id: true, status: true, remainingTime: true, createdAt: true, duration: true},
    });

    if(!timer || timer.status !== "active"){
        throw new ApiError(400, "Timer not found or not active");
    }

    const updatedTimer = await prisma.timer.update({
        where: {id: timerId},
        data: {
            status: "paused",
            remainingTime: remainingTime,
        }
    });
    return updatedTimer;
}

export const resumeTimer = async (timerId: string, userId: string) => {
    const timer = await prisma.timer.findUnique({
        where: {id: timerId},
        select: {id: true, status: true}
    })

    if(!timer || timer.status != "paused"){
        throw new ApiError(400, "Timer not found or not paused");
    }

    const updatedTimer = await prisma.timer.update({
        where: {id: timerId},
        data: {
            status: "active",
        }
    });

    return updatedTimer;
}