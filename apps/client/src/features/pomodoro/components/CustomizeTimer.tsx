import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface CustomizeTimerProps {
    workTime: number;
    breakTime: number;
    onWorkTimeChange: (value: number) => void;
    onBreakTimeChange: (value: number) => void;
    onApply: () => void;
}

const CustomizeTimer: React.FC<CustomizeTimerProps> = ({
    workTime,
    breakTime,
    onWorkTimeChange,
    onBreakTimeChange,
    onApply,
}) => (
    <div className="flex flex-col space-y-4 w-full items-center gap-4">
        <div className="grid grid-cols-2 gap-4">
            <div className='flex flex-col gap-2'>
                <Label className='text-2xl'>Focus Time (minutes)</Label>
                <Input
                    type="number"
                    value={workTime}
                    onChange={(e) => onWorkTimeChange(Number(e.target.value))}
                    min="1"
                    max="60"
                    className='px-4 py-8 block'
                    style={{ fontSize: "2rem", border: "0.1rem solid white" }}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <Label className='text-2xl'>Break Time (minutes)</Label>
                <Input
                    type="number"
                    value={breakTime}
                    onChange={(e) => onBreakTimeChange(Number(e.target.value))}
                    min="1"
                    max="30"
                    className='px-4 py-8 block'
                    style={{ fontSize: "2rem", border: "0.1rem solid white" }} />
            </div>
        </div>
        <Button onClick={onApply} className='px-6 py-8 text-2xl bg-white text-black hover:bg-gray-50 '>Apply Custom Times</Button>
    </div>
);

export default CustomizeTimer;
