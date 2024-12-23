import { BsFillStarFill, BsStar } from "react-icons/bs";

export interface Task {
    title: string;
    duration: string;
    team: { initials: string }[];
    description: string;
    isTaskStarred: boolean;
}

const TaskCard: React.FC<{ project: Task }> = ({ project }) => {
    return (
        <div className="w-full bg-orange-200 shadow-md p-4 rounded-xl flex flex-col gap-1 box-border">
            {!project?.isTaskStarred ? <BsStar className='text-3xl cursor-pointer' /> :
                <BsFillStarFill className='text-3xl cursor-pointer text-yellow-400' />}
            <h3 className="text-3xl font-medium mb-2">{project?.title}</h3>
            <p className="text-lg font-medium mb-2">{project?.title?.length >= 50 ? project?.description?.slice(0, 50) + "..." : project?.description}</p>
            <p className="text-gray-700 text-xl mb-4 font-semibold">{project?.duration}</p>
        </div>
    );
};

export default TaskCard;