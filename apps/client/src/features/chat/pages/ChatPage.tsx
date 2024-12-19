import React, { useState } from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatSidebar from '../components/ChatSidebar';
import ChatFooter from '../components/ChatFooter';
import ChatContent from '../components/ChatContent';

interface ChatMessage {
    id: number;
    sender: string;
    time: string;
    message: string;
    isSent: boolean;
}

// Sample data
const initialChatData: ChatMessage[] = [
    {
        id: 1,
        sender: 'Jasmin Lowery',
        time: '20m',
        message: 'I added new flows to our design system. Now you can use them for your projects!',
        isSent: false,
    },
    {
        id: 2,
        sender: 'Alex Hunt',
        time: '16m',
        message: 'Hey guys! Important news!',
        isSent: false,
    },
    {
        id: 3,
        sender: 'You',
        time: '9m',
        message: 'Our intern @jhurch has successfully completed his probationary period and is now part of our team!',
        isSent: true,
    },
    {
        id: 4,
        sender: 'Jasmin Lowery',
        time: '10m',
        message: 'Jayden, my congratulations! I will be glad to work with you on a new project 😊',
        isSent: false,
    },
];

const ChatPage: React.FC = () => {
    const [chatData, setChatData] = useState<ChatMessage[]>(initialChatData);
    const [newMessage, setNewMessage] = useState<string>('');

    const handleSendMessage = (): void => {
        if (newMessage.trim() !== '') {
            const newChatMessage: ChatMessage = {
                id: chatData.length + 1,
                sender: 'You',
                time: 'Just now',
                message: newMessage,
                isSent: true,
            };
            setChatData([...chatData, newChatMessage]);
            setNewMessage('');
        }
    };


    return (
        <div className="flex flex-col h-screen p-6">
            <div className="w-full flex-1 shadow-gray-600 shadow-sm flex bg-white p-6 rounded-3xl h-full">
                <ChatSidebar />
                <div className="w-3/4 flex flex-col p-4 justify-between h-full ">
                    <ChatHeader />
                    <ChatContent chatData={chatData} />
                    <ChatFooter newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
