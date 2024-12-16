import { useState } from "react";
import TaskItem from "./TaskItem";
import { TimerTask } from "../utils/enumUtil";


const TasksPanel: React.FC = () => {
    const [tasks, setTasks] = useState<TimerTask[]>([
        { title: 'Create a Visual Style Guide', status: 'inProgress', duration: '00:52:34' },
        { title: 'Outline Typography Scales', status: 'completed', duration: '01:20:00' },
        { title: 'Establish Grid Systems', status: 'notStarted', duration: '00:28:24' },
        { title: 'Create a Visual Style Guide', status: 'completed', duration: '00:52:34' },
    ]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-1/3">
            <div className='h-80 m-6'>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold">Today's Tasks</h2>
                    <button className="text-white text-xl rounded-md bg-orange-500">Manage</button>
                </div>
                {tasks?.map((task, index) => (
                    <TaskItem key={index} task={task} />
                ))}
            </div>
        </div>
    );
};

export default TasksPanel;