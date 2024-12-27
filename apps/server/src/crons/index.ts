import cron from "node-cron";
import { resetTimeWorkedToday } from "./resetTimeWorkedToday.js";

export const initializeCronJobs = () => {
    console.log("Initializing cron jobs...");

    // Schedule the resetTimeWorkedToday job to run daily at midnight
    cron.schedule("0 0 * * *", async () => {
        console.log("Running resetTimeWorkedToday job...");
        await resetTimeWorkedToday();
    });

    console.log("Cron jobs initialized.");
};
