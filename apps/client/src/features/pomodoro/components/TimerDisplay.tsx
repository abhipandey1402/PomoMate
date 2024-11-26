import React from 'react';

interface TimerDisplayProps {
    timeLeft: number;
    sessionType: string;
    formatTime: (seconds: number) => string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, sessionType, formatTime }) => {
    return (
        <div className="text-6xl font-bold mb-4">
            {formatTime(timeLeft)} {sessionType === 'work' ? '- Work Mode' : '- Break Mode'}
        </div>
    );
};

export default TimerDisplay;
