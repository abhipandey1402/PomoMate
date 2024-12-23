import { PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useGetAllTasks } from "../hooks";
import { Task, TaskGroup } from "../utils/enumUtil";

interface TaskCardPanelProps {
    openAddTaskModal: () => void;
}


const TaskCardPanel: React.FC<TaskCardPanelProps> = ({ openAddTaskModal }) => {
    const { tasks, loading }: { tasks: Task[]; loading: boolean } = useGetAllTasks();
    const [projects, setProjects] = useState<TaskGroup[]>([]);

    useEffect(() => {
        if (tasks) {
            const groupedTasks: TaskGroup[] = [
                { status: 'To-do', items: [] },
                { status: 'In-progress', items: [] },
                { status: 'Completed', items: [] },
                { status: 'Overdue', items: [] },
            ];

            tasks.forEach((task) => {
                const duration = `${(task.totalTimeRequired / 3600)?.toFixed(1)} Hours | ${new Date(task.dueDate).toLocaleDateString()}`;
                const team = [{ initials: 'JD' }, { initials: 'SM' }]; // Replace with actual team data if available.

                switch (task.status) {
                    case 'notStarted':
                        groupedTasks[0].items.push({ title: task.title, duration, team, description: task?.description, isTaskStarred: task?.isTaskStarred });
                        break;
                    case 'inProgress':
                        groupedTasks[1].items.push({ title: task.title, duration, team, description: task?.description, isTaskStarred: task?.isTaskStarred });
                        break;
                    case 'completed':
                        groupedTasks[2].items.push({ title: task.title, duration, team, description: task?.description, isTaskStarred: task?.isTaskStarred });
                        break;
                    default:
                        groupedTasks[3].items.push({ title: task.title, duration, team, description: task?.description, isTaskStarred: task?.isTaskStarred });
                        break;
                }
            });

            setProjects(groupedTasks);
        }
    }, [tasks]);

    return (
        <div className='bg-white shadow-slate-600 px-10 py-10 box-border rounded-2xl flex flex-col gap-10'>
            <span className='font-bold text-3xl'>Tasks</span>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 box-border ">
                {projects?.map((project, index) => (
                    <div key={index} className=''>
                        <h2 className="text-3xl font-semibold mb-6 bg-gray-100 p-4 rounded-xl flex justify-between">
                            <span>{project?.status}</span>
                            <PlusCircleIcon size={20} className='cursor-pointer' onClick={() => openAddTaskModal()} />
                        </h2>
                        <div className="grid grid-cols-1 gap-4 box-border">
                            {project?.items?.map((item, itemIndex) => (
                                <TaskCard key={itemIndex} project={item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskCardPanel;
