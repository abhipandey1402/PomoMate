import mongoose, { Schema } from "mongoose";

const TaskShareSchema = new Schema(
    {
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

export const TaskShare = mongoose.model('TaskShare', TaskShareSchema);
