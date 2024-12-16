import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import TaskCard from "./TaskCard";
import { TaskGroup } from "../utils/enumUtil";


const TaskCardPanel: React.FC = () => {
    const [projects, setProjects] = useState<TaskGroup[]>([
        {
            status: 'To-do',
            items: [
                { title: 'Establish Brand Color Palette', duration: '06 Hours | 28 Jul, 12:30 AM', team: [{ initials: 'JD' }, { initials: 'SM' }] },
                { title: 'Define Typography Standards', duration: '06 Hours | 28 Jul, 12:30 AM', team: [{ initials: 'JD' }, { initials: 'SM' }] },
            ],
        },
        {
            status: 'In-progress',
            items: [
                { title: 'Craft Component Library Layouts', duration: '06 Hours | 28 Jul, 12:30 AM', team: [{ initials: 'JD' }, { initials: 'SM' }] },
                { title: 'Map Out Interaction Patterns', duration: '06 Hours | 28 Jul, 12:30 AM', team: [{ initials: 'JD' }, { initials: 'SM' }] },
            ],
        },
        {
            status: 'Completed',
            items: [
                { title: 'Build Responsive Frameworks', duration: '06 Hours | 28 Jul, 12:30 AM', team: [{ initials: 'JD' }, { initials: 'SM' }] },
                { title: 'Finalize Component States', duration: '06 Hours | 28 Jul, 12:30 AM', team: [{ initials: 'JD' }, { initials: 'SM' }] },
            ],
        },
        {
            status: 'Overdue',
            items: [
                { title: 'Define Iconography Standards', duration: '06 Hours | 28 Jul, 12:30 AM', team: [{ initials: 'JD' }, { initials: 'SM' }] },
                { title: 'Refine Color Palettes', duration: '06 Hours | 28 Jul, 12:30 AM', team: [{ initials: 'JD' }, { initials: 'SM' }] },
            ],
        },
    ]);

    return (
        <div className='bg-white shadow-slate-600 px-10 py-10 box-border rounded-2xl flex flex-col gap-10'>
            <span className='font-bold text-3xl'>Tasks</span>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 box-border ">
                {projects?.map((project, index) => (
                    <div key={index} className=''>
                        <h2 className="text-3xl font-semibold mb-6 bg-gray-100 p-4 rounded-xl flex justify-between">
                            <span>{project?.status}</span>
                            <PlusCircleIcon size={20} className='cursor-pointer' />
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
    )
};

export default TaskCardPanel;