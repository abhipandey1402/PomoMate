import { BsFillStarFill, BsStar } from "react-icons/bs";
import { Task } from "../utils/enumUtil";

const TaskCard: React.FC<{ project: Task }> = ({ project }) => {
    return (
        <div className="w-full bg-orange-200 shadow-md p-4 rounded-xl flex flex-col gap-1 box-border">
            {/* <BsStar className='text-3xl cursor-pointer'/> */}
            <BsFillStarFill className='text-3xl cursor-pointer text-yellow-400' />
            <h3 className="text-3xl font-medium mb-2">{project?.title}</h3>
            <p className="text-gray-700 text-lg mb-4">{project?.duration}</p>
            <div className="flex items-center self-end space-x-2">
                {project?.team?.map((member, index) => (
                    <div
                        key={index}
                        className="w-10 h-10 p-2 text-lg font-semibold rounded-full bg-white flex items-center justify-center"
                    >
                        {member?.initials}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskCard;