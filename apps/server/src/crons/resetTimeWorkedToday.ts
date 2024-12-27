import { Task } from "../models/task.model.js"; // Import the Task model

export const resetTimeWorkedToday = async () => {
    try {
        // Reset timeWorkedToday for all tasks
        const result = await Task.updateMany(
            {}, // Empty filter to match all tasks
            { $set: { timeWorkedToday: 0 } } // Reset timeWorkedToday to 0
        );
        console.log("Successfully reset timeWorkedToday for all tasks.");
        return result;
    } catch (error) {
        console.error("Error resetting timeWorkedToday:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};
