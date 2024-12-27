import mongoose, { Schema } from "mongoose";

const TeamSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        isPublic: { type: Boolean, default: false },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export const Team = mongoose.model('Team', TeamSchema);
