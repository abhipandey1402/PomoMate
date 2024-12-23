import { Server, Socket } from 'socket.io';
import { createMessage } from '../services/chat.service.js';

export const setupChatSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('send_message', async ({ senderId, recipientId, message, isChannel }) => {
            // Create message with conditional recipientId handling
            const newMessage = await createMessage(senderId, recipientId, message, isChannel);

            // Emit the message to the appropriate recipient/channel
            if (isChannel) {
                // If the message is for a channel, send it to the channel
                io.to(recipientId).emit('receive_message', newMessage); // recipientId is the channelId
            } else {
                // If the message is not for a channel, send it to the direct user (socket.id)
                io.to(socket.id).emit('receive_message', newMessage);
            }
        });

        socket.on('join_channel', (channelId: string) => {
            socket.join(channelId);
            console.log(`User joined channel: ${channelId}`);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
