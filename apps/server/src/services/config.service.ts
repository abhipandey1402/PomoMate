import prisma from "../db/prismaClient.js"
import { ApiError } from "../utils/ApiError.js";
import { defaultConfig } from "../utils/globalData.js";

export const getConfig = async (userId: string) => {
    const config = await prisma.userConfig.findUnique({
        where: { userId: userId },
    });

    if (!config) {
        throw new ApiError(401, "Config not found for current user");
    }
    return config;
};

export const updateConfig = async (data: any, userId: string) => {
    const config = await prisma.userConfig.findUnique({
        where: { userId: userId },
    })

    if (!config) {
        throw new ApiError(400, "Config not found for current user");
    }

    const updatedConfig = await prisma.userConfig.update({
        where: { userId: userId },
        data,
    })

    return updatedConfig;
};

export const resetConfig = async (userId: string) => {
    const config = await prisma.userConfig.findUnique({
        where: { userId: userId },
    });

    if (!config) {
        throw new ApiError(400, "Config not found for current user")
    }

    const resetConfig = await prisma.userConfig.update({
        where: { userId: userId },
        data: defaultConfig,
    });

    return resetConfig;
};

export const createConfig = async (userId: string) => {

    const existingConfig = await prisma.userConfig.findUnique({
        where: { userId: userId },
    });

    if (existingConfig) {
        throw new ApiError(400, "Config already exists");
    }

    const newConfig = await prisma.userConfig.create({
        data: {
            ...defaultConfig,
            user: {
                connect: {
                    id: userId
                }, // Connect to existing user
            },
        },
    });

    return newConfig;
};

export const getDefaultConfig = async () => {
    return defaultConfig;
};

export const checkConfigExists = async (userId: string) => {
    const config = await prisma.userConfig.findUnique({
        where: { userId: userId },
    });
    return !!config;
};