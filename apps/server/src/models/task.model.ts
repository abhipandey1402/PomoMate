import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        status: { type: String, default: 'notStarted' },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isPublic: { type: Boolean, default: false },
        teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskShare' }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        totalTimeRequired: { type: Number },
        timeWorked: { type: Number, default: 0 },
        timeWorkedToday: { type: Number, default: 0 },
        remainingTime: { type: Number, default: 0 },
        isTaskStarred: { type: Boolean, default: false },
        dueDate: { type: Date },
        isBeingWorkedOn: { type: Boolean, default: false },
        sharedWithUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        timerStartTime: { type: Date },
        timerEndTime: { type: Date }
    },
    { timestamps: true }
);

export const Task = mongoose.model('Task', TaskSchema);
