import prisma from "../db/prismaClient.js";
import { ApiError } from "../utils/ApiError.js";
import { hashPassword, isPasswordCorrect, generateAccessToken, generateRefreshToken } from "../utils/AuthHelper.js";

interface RegisterUserInput {
    fullName: string;
    email: string;
    username: string;
    password: string;
}

interface LoginUserInput {
    email?: string;
    username?: string;
    password: string;
}

export const registerUser = async (data: RegisterUserInput) => {
    const { fullName, email, username, password } = data;

    const existedUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] },
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            fullName,
            email,
            username: username.toLowerCase(),
            password: hashedPassword,
        },
    });

    const accessToken = generateAccessToken({ id: user.id });

    return { user: { ...user, password: undefined, refreshToken: undefined }, accessToken };
};

export const loginUser = async (data: LoginUserInput) => {
    const { email, username, password } = data;

    const user = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] },
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await isPasswordCorrect(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });

    return {
        user: { ...user, password: undefined, refreshToken: undefined },
        accessToken,
        refreshToken,
    };
};

export const logoutUser = async (userId: string): Promise<void> => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
    });
};

export const refreshAccessToken = async (incomingRefreshToken: string) => {
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    const user = await prisma.user.findFirst({
        where: { refreshToken: incomingRefreshToken },
    });

    if (!user) {
        throw new ApiError(403, "Invalid refresh token");
    }

    const newAccessToken = generateAccessToken({ id: user.id });
    const newRefreshToken = generateRefreshToken({ id: user.id });

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string): Promise<void> => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isOldPasswordValid = await isPasswordCorrect(oldPassword, user.password);
    if (!isOldPasswordValid) {
        throw new ApiError(401, "Old password is incorrect");
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
    });
};

export const getCurrentUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
            role: true,
            avatarUrl: true,
            preferences: true,
            completedSessions: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};
