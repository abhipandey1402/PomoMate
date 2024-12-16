import { useState } from "react";

const TaskMetric: React.FC = () => {
    const [metric, setMetric] = useState(
        { total: 22, notStarted: 2, inProgress: 5, completed: 15 },
    );

    return (
        <div className="bg-white w-1/3 rounded-lg shadow-md p-6 mb-6 text-black flex justify-center">
            <div className="flex flex-col h-80 w-full justify-center items-center m-6 gap-10 box-border ">
                <span className='text-3xl font-semibold'>Total Tasks :  {metric?.total}</span>
                <div className='w-full flex justify-between gap-6'>
                    <div className='bg-orange-200 rounded-lg text-black h-40 w-1/3 flex flex-col font-bold items-start justify-around p-6'>
                        <span className='text-3xl'>{metric?.notStarted}</span>
                        <span className='text-2xl text-gray-600'>To do</span>
                    </div>
                    <div className='bg-yellow-200 rounded-lg text-black h-40 w-1/3 flex flex-col font-bold items-start justify-around p-6'>
                        <span className='text-3xl'>{metric?.inProgress}</span>
                        <span className='text-2xl text-gray-600'>In progress</span>
                    </div>
                    <div className='bg-green-300 rounded-lg text-black h-40 w-1/3 flex flex-col font-bold items-start justify-around p-6'>
                        <span className='text-3xl'>{metric?.completed}</span>
                        <span className='text-2xl text-gray-600'>Completed</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskMetric;