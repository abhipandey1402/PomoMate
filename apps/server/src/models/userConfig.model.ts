import mongoose, { Schema } from "mongoose";

const UserConfigSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
        pomodoroTime: { type: Number, default: 1500 },
        shortBreakTime: { type: Number, default: 300 },
        longBreakTime: { type: Number, default: 900 },
        autoStartBreaks: { type: Boolean, default: false },
        autoStartPomodoros: { type: Boolean, default: false },
        longBreakInterval: { type: Number, default: 4 },
        autoCheckTasks: { type: Boolean, default: false },
        autoSwitchTasks: { type: Boolean, default: true },
        alarmSound: { type: String },
        alarmVolume: { type: Number, default: 50 },
        alarmRepeat: { type: Number, default: 1 },
        tickingSound: { type: String },
        tickingVolume: { type: Number, default: 50 },
        colorTheme: { type: String, default: 'red' },
        hourFormat: { type: String, default: '24-hour' },
        darkMode: { type: Boolean, default: false },
        reminderTime: { type: Number },
        mobileAlarmEnabled: { type: Boolean, default: false },
        integrations: { type: mongoose.Schema.Types.Mixed },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export const UserConfig = mongoose.model('UserConfig', UserConfigSchema);
