import React from 'react';
import { Button } from '@/components/ui/button';

interface SessionInfoProps {
    workTime: number;
    breakTime: number;
    sessionType: string;
    onCustomize: () => void;
}

const SessionInfo: React.FC<SessionInfoProps> = ({ workTime, breakTime, sessionType, onCustomize }) => (
    <div className="flex space-x-6 mb-6">
        <div className={`p-4 text-2xl rounded ${sessionType === 'work' ? 'bg-black text-white' : 'bg-gray-100'}`}>
            Work: {workTime} min
        </div>
        <div className={`p-4 text-2xl rounded ${sessionType === 'break' ? 'bg-black text-white' : 'bg-gray-100'}`}>
            Break: {breakTime} min
        </div>
        <Button variant="secondary" className="px-4 py-8 text-lg" onClick={onCustomize}>
            Customize
        </Button>
    </div>
);

export default SessionInfo;
