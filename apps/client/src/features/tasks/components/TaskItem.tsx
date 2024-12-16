import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { TimerTask } from "../utils/enumUtil";


const TaskItem: React.FC<{ task: TimerTask }> = ({ task }) => {
    return (
        <div className="flex items-center justify-between px-4 py-4 border-b">
            <div className="flex items-center space-x-3">
                {task?.status === 'inProgress' ? (
                    <BsPauseFill className="text-yellow-500 text-4xl cursor-pointer" />
                ) : (
                    <BsPlayFill className="text-green-500 text-4xl cursor-pointer" />
                )}
                <h3 className="text-2xl text-gray-800">{task?.title}</h3>
            </div>
            <div className="text-gray-500 text-xl">{task?.duration}</div>
        </div>
    );
};

export default TaskItem;