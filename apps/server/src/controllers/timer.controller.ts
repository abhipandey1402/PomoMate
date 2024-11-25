import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import * as timerService from "../services/timer.service.js";

export const startTimer = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { duration, breakTime } = req.body;
    const userId = req.user.id;

    const timer = await timerService.startTimer({ duration, breakTime, userId });
    res.status(201).json(
        new ApiResponse(201, timer, "Timer Started")
    );
});

export const getTimer = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { timerId } = req.params;
    const userId = req.user.id;

    const timerData = await timerService.getTimer(timerId, userId);

    res.status(200).json(
        new ApiResponse(200, timerData, "Timer Data fetched successfully")
    );
});

export const pauseTimer = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { timerId } = req.params;
    const { remainingTime } = req.body;
    const userId = req.user.id;

    const pausedTimer = await timerService.pauseTimer(timerId, remainingTime, userId);

    res.status(200).json(
        new ApiResponse(200, pausedTimer, "Timer Paused")
    );
});

export const resumeTimer = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { timerId } = req.params;
    const userId = req.user.id;

    const resumedTimer = await timerService.resumeTimer(timerId, userId);

    res.status(200).json(
        new ApiResponse(200, resumedTimer, "Timer Resumed")
    );
});

export const completeTimer = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { timerId } = req.params;
    const userId = req.user.id;

    const completedTimer = await timerService.completeTimer(timerId, userId);

    res.status(200).json(
        new ApiResponse(200, completedTimer, "Timer Completed")
    );
});

export const clearTimer = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { timerId } = req.params;
    const userId = req.user.id;

    const clearedTimer = await timerService.clearTimer(timerId, userId);

    res.status(200).json(
        new ApiResponse(200, clearedTimer, "Timer cleared Successfully")
    );
});