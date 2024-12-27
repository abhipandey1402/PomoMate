const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true, required: true },
        description: { type: String },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserChannel' }],
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Channel', ChannelSchema);
