import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';

// Simulate __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDirectory = path.resolve(__dirname, '../../logs'); // Ensure logs/ folder is created at project root

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug', // Set log level based on environment
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }) // Include stack traces in errors
    ),
    transports: [
        // Console Transport with Colors
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // Enable colors for console
                winston.format.printf(({ timestamp, level, message, stack }) => {
                    return `[${timestamp}] ${level}: ${stack || message}`;
                })
            ),
        }),
        // Daily Rotate File Transport (Uncolored)
        new winston.transports.DailyRotateFile({
            dirname: logDirectory,
            filename: 'application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info',
            format: winston.format.combine(
                winston.format.uncolorize(), // Remove colors for file logs
                winston.format.json() // Log as JSON for structured logging
            ),
        }),
    ],
});

// If in development mode, add a console-only transport for verbose/debug-level logs
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message, stack }) => {
                    return `[${timestamp}] ${level}: ${stack || message}`;
                })
            ),
            level: 'debug',
        })
    );
}

export default logger;
