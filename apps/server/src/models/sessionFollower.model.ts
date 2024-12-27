import mongoose, { Schema } from "mongoose";

const SessionFollowerSchema = new Schema(
    {
        sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

export const SessionFollower = mongoose.model('SessionFollower', SessionFollowerSchema);
