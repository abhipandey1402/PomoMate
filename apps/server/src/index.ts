import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { globalErrorHandler } from './utils/GlobalErrorHandler.js';
import { initializeCronJobs } from './crons/index.js';

import userRouter from './routes/user.routes.js';
import timerRouter from './routes/timer.routes.js';
import taskRouter from './routes/task.routes.js';
import configRouter from './routes/config.routes.js';
import chatRouter from './routes/chat.routes.js';
import messageRouter from './routes/message.routes.js';
import connectDB from './db/index.js';
import { Server } from 'socket.io';
import { initializeSocketIO } from './sockets/index.js';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";

// Resolve the current file path and directory
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// Read and parse the swagger.yaml file
const file: string = fs.readFileSync(path.resolve(__dirname, "../src/swagger.yaml"), "utf8");

// Replace placeholder and parse YAML content
const swaggerDocument: Record<string, any> = YAML.parse(
    file?.replace(
        "- url: ${{server}}",
        `- url: ${process.env.POMOMATE_HOST_URL || "http://localhost:8080"}/api/v1`
    )
);

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
    app.use("/api/v1/chats", chatRouter);
    app.use("/api/v1/messages", messageRouter);
};

const configureSocket = () => {
    const io = new Server(httpServer, {
        pingTimeout: 60000,
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173',],
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    app.set("io", io); // using set method to mount the `io` instance on the app to avoid usage of `global`
    
    initializeSocketIO(io);
}

const startServer = async () => {
    try {
        connectDB();
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
    configureSocket();
    app.use(globalErrorHandler);
}

initializeApp();
startServer();


// * API DOCS
// ? Keeping swagger code at the end so that we can load swagger on "/" route
app.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            docExpansion: "none", // keep all the sections collapsed by default
        },
        customSiteTitle: "FreeAPI docs",
    })
);

export { app };
