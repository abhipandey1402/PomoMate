import { Timer } from "../models/timer.model.js";  // Assuming you've created a Timer model with Mongoose
import { ApiError } from "../utils/ApiError.js";

interface StartTimerInput {
    userId: string;
    duration: number;
    breakTime: number;
};

export const startTimer = async (data: StartTimerInput) => {
    const { duration, breakTime, userId } = data;

    const timer = new Timer({
        userId,
        duration,
        breakTime,
        remainingTime: duration,
        status: "active", // Default status when a timer starts
        completed: false,
    });

    await timer.save();  // Save the timer document
    return timer;
};

export const getTimer = async (timerId: string, userId: string) => {
    const timer = await Timer.findOne({
        _id: timerId,
        userId: userId,
    });

    if (!timer) {
        throw new ApiError(400, "Timer not found");
    }

    return timer;
};

export const pauseTimer = async (timerId: string, remainingTime: number, userId: string) => {
    const timer = await Timer.findOne({
        _id: timerId,
        userId: userId,
    });

    if (!timer || timer.status !== "active") {
        throw new ApiError(400, "Timer not found or not active");
    }

    timer.status = "paused";
    timer.remainingTime = remainingTime;
    await timer.save();  // Save the changes

    return timer;
};

export const resumeTimer = async (timerId: string, userId: string) => {
    const timer = await Timer.findOne({
        _id: timerId,
        userId: userId,
    });

    if (!timer || timer.status !== "paused") {
        throw new ApiError(400, "Timer not found or not paused");
    }

    timer.status = "active";
    await timer.save();  // Save the changes

    return timer;
};

export const completeTimer = async (timerId: string, userId: string) => {
    const timer = await Timer.findOne({
        _id: timerId,
        userId: userId,
    });

    if (!timer || timer.status === "completed") {
        throw new ApiError(400, "Timer not found or not in the state to be completed");
    }

    timer.status = "completed";
    timer.completed = true;
    timer.remainingTime = 0;
    await timer.save();  // Save the changes

    return timer;
};

export const clearTimer = async (timerId: string, userId: string) => {
    const timer = await Timer.findOne({
        _id: timerId,
        userId: userId,
    });

    if (!timer || timer.status === "completed") {
        throw new ApiError(400, "Timer not found or it's completed");
    }

    await timer.deleteOne();  // Remove the timer from the collection

    return "Timer deleted successfully";
};
