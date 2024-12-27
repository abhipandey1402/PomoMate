import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        fullName: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' },
        avatarUrl: { type: String },
        preferences: { type: mongoose.Schema.Types.Mixed },
        completedSessions: { type: Number, default: 0 },
        refreshToken: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        sessionsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
        sessionsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SessionFollower' }],
        tasksOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        sharedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskShare' }],
        teamsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
        teamsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
        messagesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
        messagesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
        channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserChannel' }],
        timers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timer' }],
        notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
        UserConfig: { type: mongoose.Schema.Types.ObjectId, ref: 'UserConfig' }
    },
    { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
