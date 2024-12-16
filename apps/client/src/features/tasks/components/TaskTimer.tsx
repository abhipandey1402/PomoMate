import { useState } from "react";
import { BsPauseFill } from "react-icons/bs";
import { convertSecondsToTime } from "../utils/timeUtils";

const TaskTimer: React.FC = () => {
    const [timer, setTimer] = useState(
        { title: 'Create a Visual Style Guide', totalTime: 15000, todayWorkedTime: 2000, remainingTime: 13000 },
    );

    return (
        <div className="bg-orange-500 w-1/3 rounded-lg shadow-md p-6 mb-6 text-white flex justify-center">
            <div className="flex h-80 flex-col w-fit justify-center items-center m-6 gap-10">
                <h2 className="text-4xl font-bold">{timer?.title}</h2>
                <BsPauseFill size={48} className='bg-white p-2 rounded-full text-orange-500' />
                <div className='flex justify-center items-center gap-10 text-2xl'>
                    <div className='rounded-xl flex flex-col justify-center items-center bg-white font-semibold px-4 py-2'>
                        <span className='text-gray-700'>Today</span>
                        <span className='text-black'>{convertSecondsToTime(timer?.todayWorkedTime)}</span>
                    </div>
                    <div className='rounded-xl flex flex-col justify-center items-center bg-white font-semibold px-4 py-2'>
                        <span className='text-gray-700'>Total</span>
                        <span className='text-black'>{convertSecondsToTime(timer?.totalTime)}</span>
                    </div>
                    <div className='rounded-xl flex flex-col justify-center items-center bg-white font-semibold px-4 py-2'>
                        <span className='text-gray-700'>Remaining</span>
                        <span className='text-black'>{convertSecondsToTime(timer?.remainingTime)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskTimer;