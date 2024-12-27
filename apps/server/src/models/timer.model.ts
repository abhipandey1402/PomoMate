import mongoose, { Schema } from "mongoose";

const TimerSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        duration: { type: Number, required: true },
        breakTime: { type: Number, required: true },
        remainingTime: { type: Number },
        status: { type: String, enum: ['active', 'paused', 'completed', 'cancelled'], default: 'active' },
        completed: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export const Timer = mongoose.model('Timer', TimerSchema);
