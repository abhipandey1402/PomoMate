import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import prisma from './db/prismaClient.js';
import { globalErrorHandler } from './utils/GlobalErrorHandler.js';
import { initializeCronJobs } from './crons/index.js';

import userRouter from './routes/user.routes.js';
import timerRouter from './routes/timer.routes.js';
import taskRouter from './routes/task.routes.js';
import configRouter from './routes/config.routes.js';

// Load environment variables
dotenv.config({
    path: './.env',
});

const app: Application = express();
const httpServer = createServer(app);


// Middleware

const configureMiddleware = () => {
    app.use(
        cors({
            origin: [
                'http://localhost:3000',
                'http://localhost:3001',
                'http://localhost:5173',
            ],
            methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
            credentials: true,
        }),
    );

    app.use(express.json({ limit: '32kb' }));
    app.use(express.urlencoded({ extended: true, limit: '32kb' }));
    app.use(express.static('public'));
    app.use(cookieParser());
}

// Setup routes for API endpoints
const setupRoutes = () => {
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/timer", timerRouter);
    app.use("/api/v1/task", taskRouter);
    app.use("/api/v1/config", configRouter);
};

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to the database.");

        // Initialize cron jobs
        initializeCronJobs();

        const port = process.env.PORT || 8000;
        httpServer.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        });
    } catch (err) {
        console.error('Database connection failed!', err);
        process.exit(1); // Gracefully exit if DB connection fails
    }
}


const initializeApp = () => {
    configureMiddleware();
    setupRoutes();
    app.use(globalErrorHandler);
}

initializeApp();
startServer();

export { app };
