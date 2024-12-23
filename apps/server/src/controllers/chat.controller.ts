import { ApiResponse } from '../utils/ApiResponse.js';
import * as chatService from '../services/chat.service.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

export const sendMessage = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { senderId, recipientId, message, isChannel } = req.body;

    // In the case of a direct message (not a channel), recipientId will be used.
    const newMessage = await chatService.createMessage(senderId, recipientId, message, isChannel);

    res.status(201).json(
        new ApiResponse(201, newMessage, 'Message sent successfully')
    );
});

export const getMessages = asyncHandler(async (req: any, res: any): Promise<void> => {
    const messages = await chatService.fetchChannels();

    res.status(200).json(
        new ApiResponse(200, messages, 'Messages fetched successfully')
    );
});

export const createChannel = async (req: any, res: any) => {
    const { name, description, createdBy } = req.body;

    if (!name || !createdBy) {
        return res.status(400).json({ error: 'Name and createdBy fields are required' });
    }

    const channel = await chatService.createChannel({ name, description, createdBy });
    res.status(201).json(
        new ApiResponse(201, channel, "Channel created successfully")
    )
};

export const getChannels = asyncHandler(async (_req: any, res: any): Promise<void> => {
    const channels = await chatService.fetchChannels();

    res.status(200).json(
        new ApiResponse(200, channels, 'Channels fetched successfully')
    );
});

export const joinChatChannel = asyncHandler(async (req: any, res: any): Promise<void> => {
    const { userId, channelId } = req.body;

    const channel = await chatService.joinChannel(userId, channelId);

    res.status(200).json(
        new ApiResponse(200, channel, 'Joined channel successfully')
    );
});
