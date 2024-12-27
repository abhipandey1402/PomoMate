import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema(
    {
        name: { type: String, required: true },
        duration: { type: Number, required: true },
        breakTime: { type: Number, required: true },
        isPublic: { type: Boolean, default: false },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SessionFollower' }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export const Session = mongoose.model('Session', SessionSchema);
