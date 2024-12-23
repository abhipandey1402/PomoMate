import prisma from '../db/prismaClient.js';

interface CreateChannelInput {
    name: string;
    description?: string;
    createdBy: string; // User ID of the creator
}

export const createMessage = async (
    senderId: string,
    recipientId: string | undefined,
    message: string,
    isChannel: boolean
) => {
    // Conditional check to ensure recipientId is not passed if isChannel is true
    const data: any = {
        senderId,
        message,
        isChannel,
    };

    if (!isChannel && recipientId) {
        data.recipientId = recipientId; // Only add recipientId if not a channel message
    }

    const newMessage = await prisma.message.create({
        data: data,
    });

    return newMessage;
};


export const fetchMessages = async (recipientId: string, isChannel: boolean) => {
    const messages = await prisma.message.findMany({
        where: {
            // For channels, recipientId will be 'undefined'. For direct messages, use 'recipientId'.
            recipientId: isChannel ? undefined : recipientId,
            isChannel,
        },
        orderBy: { createdAt: 'asc' },
    });
    return messages;
};

export const createChannel = async (input: CreateChannelInput) => {
    const { name, description, createdBy } = input;

    // Check if a channel with the same name already exists
    const existingChannel = await prisma.channel.findUnique({
        where: { name },
    });

    if (existingChannel) {
        throw new Error('Channel with this name already exists');
    }

    // Create a new channel
    const channel = await prisma.channel.create({
        data: {
            name,
            description,
            createdBy,
        },
    });

    return channel;
};


export const fetchChannels = async () => {
    // Return a list of all channels.
    const channels = await prisma.channel.findMany({
        include: {
            // Optionally, you can include users or messages in channels here
            messages: true,
            users: true
        }
    });
    return channels;
};

export const joinChannel = async (userId: string, channelId: string) => {
    // Create a new UserChannel relation, linking the user and the channel.
    const channel = await prisma.userChannel.create({
        data: {
            userId,
            channelId,
        },
    });
    return channel;
};
