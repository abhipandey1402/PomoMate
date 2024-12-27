import { UserConfig } from "../models/userConfig.model.js";
import { ApiError } from "../utils/ApiError.js";
import { defaultConfig } from "../utils/globalData.js";

export const getConfig = async (userId: string) => {
    const config = await UserConfig.findOne({ userId: userId });

    if (!config) {
        throw new ApiError(400, "Config not found for current user");
    }
    return config;
};

export const updateConfig = async (data: any, userId: string) => {
    const config = await UserConfig.findOne({ userId: userId });

    if (!config) {
        throw new ApiError(400, "Config not found for current user");
    }

    Object.assign(config, data); // Update the config with the new data
    await config.save();

    return config;
};

export const resetConfig = async (userId: string) => {
    const config = await UserConfig.findOne({ userId: userId });

    if (!config) {
        throw new ApiError(400, "Config not found for current user");
    }

    Object.assign(config, defaultConfig); // Reset the config to defaultConfig
    await config.save();

    return config;
};

export const createConfig = async (userId: string) => {
    const existingConfig = await UserConfig.findOne({ userId: userId });

    if (existingConfig) {
        throw new ApiError(400, "Config already exists");
    }

    const newConfig = new UserConfig({
        ...defaultConfig,
        userId: userId, // Connect to the user by userId
    });

    await newConfig.save();
    return newConfig;
};

export const getDefaultConfig = async () => {
    return defaultConfig;
};

export const checkConfigExists = async (userId: string) => {
    const config = await UserConfig.findOne({ userId: userId });
    return !!config;
};
