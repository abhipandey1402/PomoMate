import prisma from "../db/prismaClient.js";

export const resetTimeWorkedToday = async () => {
    try {
        await prisma.task.updateMany({
            data: { timeWorkedToday: 0 },
        });
        console.log("Successfully reset timeWorkedToday for all tasks.");
    } catch (error) {
        console.error("Error resetting timeWorkedToday:", error);
    }
};
