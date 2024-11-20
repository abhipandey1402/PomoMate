import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { hashPassword, isPasswordCorrect, generateAccessToken, generateRefreshToken } from "../utils/AuthHelper.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const prisma = new PrismaClient();

// Helper to generate access and refresh tokens
const generateAccessAndRefreshTokens = async (userId: number): Promise<{ accessToken: string, refreshToken: string }> => {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = generateAccessToken({ id: user.id });
        const refreshToken = generateRefreshToken({ id: user.id });

        await prisma.user.update({
            where: { id: userId },
            data: { refreshToken },
        });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

// Register User
const registerUser = asyncHandler(async (req: any, res: any): Promise<any> => {
    const { fullName, email, username, password } = req.body;

    if ([fullName, email, username, password].some((field: string) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { username }],
        },
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

    const { accessToken } = await generateAccessAndRefreshTokens(user.id);

    return res.status(201).json(
        new ApiResponse(201, { user: { ...user, password: undefined, refreshToken: undefined }, accessToken }, "User registered successfully")
    );
});

// Login User
const loginUser = asyncHandler(async (req: any, res: any): Promise<any> => {
    const { email, username, password } = req.body;

    if (!email && !username) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { username }],
        },
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await isPasswordCorrect(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id);

    const options = { httpOnly: true, secure: true };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user: { ...user, password: undefined, refreshToken: undefined }, accessToken, refreshToken }, "User logged in successfully")
        );
});

// Logout User
const logoutUser = asyncHandler(async (req: any, res: any): Promise<any> => {
    await prisma.user.update({
        where: { id: req.user.id },
        data: { refreshToken: null },
    });

    const options = { httpOnly: true, secure: true };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req: any, res: any): Promise<any> => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;

        const user = await prisma.user.findUnique({ where: { id: decodedToken.id } });

        if (!user || user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Invalid or expired refresh token");
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user.id);

        const options = { httpOnly: true, secure: true };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
    } catch (error: any) {
        throw new ApiError(401, "Invalid refresh token");
    }
});

// Change Password
const changeCurrentPassword = asyncHandler(async (req: any, res: any): Promise<any> => {
    const { oldPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user || !(await isPasswordCorrect(oldPassword, user.password))) {
        throw new ApiError(400, "Invalid old password");
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

// Get Current User
const getCurrentUser = asyncHandler(async (req: any, res: any): Promise<any> => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { id: true, fullName: true, email: true, username: true },
    });

    return res.status(200).json(new ApiResponse(200, { user }, "User fetched successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
};
