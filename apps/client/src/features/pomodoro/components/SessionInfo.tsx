import React from 'react';

interface SessionInfoProps {
    workTime: number;
    breakTime: number;
    sessionType: string;
    onCustomize: () => void;
}

const SessionInfo: React.FC<SessionInfoProps> = ({ workTime, breakTime, sessionType, onCustomize }) => (
    <div className="flex space-x-6 mb-6">
        <div className={`p-4 text-3xl rounded ${sessionType === 'work' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
            Focus: {workTime} min
        </div>
        <div className={`p-4 text-3xl rounded ${sessionType === 'break' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
            Break: {breakTime} min
        </div>
        <div className="p-4 bg-gray-200 text-black text-3xl rounded cursor-pointer" onClick={onCustomize}>
            Customize
        </div>
    </div>
);

export default SessionInfo;
