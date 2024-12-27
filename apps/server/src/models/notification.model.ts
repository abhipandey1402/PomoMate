import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export const Notification = mongoose.model('Notification', NotificationSchema);
