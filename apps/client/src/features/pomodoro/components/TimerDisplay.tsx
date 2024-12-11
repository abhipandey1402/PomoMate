import React from 'react';

interface TimerDisplayProps {
    timeLeft: number;
    formatTime: (seconds: number) => string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, formatTime }) => {
    return (
        <div className="text-9xl font-bold mb-20 mt-20">
            {formatTime(timeLeft)}
        </div>
    );
};

export default TimerDisplay;
