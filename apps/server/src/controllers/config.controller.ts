import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import * as configService from "../services/config.service.js"

export const getConfig = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;

    const config = await configService.getConfig(userId);

    res.status(200).json(
        new ApiResponse(200, config, "Config data fetched successfully")
    );
});

export const updateConfig = asyncHandler(async (req: any, res: any): Promise<void> => {
    const updatedData = req.body;
    const userId = req.user.id;

    const updatedConfig = await configService.updateConfig(updatedData, userId);

    res.status(200).json(
        new ApiResponse(200, updatedConfig, "Config updated successfully")
    );
});

export const resetConfig = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;

    const resetedConfig = await configService.resetConfig(userId);

    res.status(200).json(
        new ApiResponse(200, resetedConfig, "Config reset to default")
    );
});

export const createConfig = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;

    const config = await configService.createConfig(userId);

    res.status(200).json(
        new ApiResponse(200, config, "config added successfully")
    );
});

export const getDefaultConfig = asyncHandler(async (req: any, res: any): Promise<void> => {
    const defaultConfig = await configService.getDefaultConfig();
    res.status(200).json(
        new ApiResponse(200, defaultConfig, "Default Config fetched")
    );
});

export const checkConfigExists = asyncHandler(async (req: any, res: any): Promise<void> => {
    const userId = req.user.id;
    const exists = await configService.checkConfigExists(userId);
    res.status(200).json(
        new ApiResponse(200, { exists }, "Config existence checked")
    );
});