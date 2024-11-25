import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import prisma from './db/prismaClient.js';

// Load environment variables
dotenv.config({
    path: './.env',
});

const app: Application = express();

// Middleware
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
        ],
        methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    }),
);

app.use(
    express.json({
        limit: '32kb',
    }),
);

app.use(
    express.urlencoded({
        extended: true,
        limit: '32kb',
    }),
);

app.use(express.static('public'));
app.use(cookieParser());

// Connect to database and start the server
(async () => {
    try {
        await prisma.$connect();
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        });
    } catch (err) {
        console.error('PostgreSQL connection failed!', err);
    }
})();

// Swagger documentation


import userRouter from "./routes/user.routes.js"
import timerRouter from './routes/timer.routes.js';
import taskRouter from './routes/task.routes.js';

app.use("/api/v1/users", userRouter);
app.use("/api/v1/timer", timerRouter);
app.use("/api/v1/task", taskRouter);


export { app };
