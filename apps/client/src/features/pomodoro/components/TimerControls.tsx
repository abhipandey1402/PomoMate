import React from 'react';
import { Button } from '@/components/ui/button';

interface TimerControlsProps {
    isRunning: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({ isRunning, onStart, onPause, onReset }) => (
    <div className="flex space-x-10 mt-10">
        {!isRunning ? (
            <Button onClick={onStart} className='px-8 py-8 text-4xl'>Start</Button>
        ) : (
            <Button onClick={onPause} className='px-8 py-8 text-4xl'>Pause</Button>
        )}
        <Button variant="secondary" className='px-8 py-8 text-4xl' onClick={onReset}>
            Reset
        </Button>
    </div>
);

export default TimerControls;
