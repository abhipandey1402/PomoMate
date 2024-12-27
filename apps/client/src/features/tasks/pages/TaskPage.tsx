import React, { useState } from "react";
import Header from "../components/Header";
import TaskTimer from "../components/TaskTimer";
import TasksPanel from "../components/TasksPanel";
import TaskMetric from "../components/TaskMetric";
import TaskCardPanel from "../components/TaskCardPanel";
import AddTaskForm from "../components/AddTaskForm";
import axiosClient from "@/interceptors/axiosClient";
import { toast } from "react-toastify";
import { useAddTask } from "../hooks";

interface TimeRequired {
    hours: number;
    minutes: number;
}

interface TaskFormData {
    title: string;
    description: string;
    totalTimeRequired: TimeRequired;
    dueDate: string;
}

const TaskPage: React.FC = () => {
    const { addTask, loading } = useAddTask(); 
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        totalTimeRequired: { hours: 0, minutes: 0 },
        dueDate: ''
    });
    

    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addTask(formData, toggleDialog);
        } catch (error) {
            console.error('Error adding Task:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 box-border">
            {isDialogOpen && <AddTaskForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} isOpen={isDialogOpen} toggleDialog={toggleDialog} />}
            <Header />
            <main className="p-6 space-y-6">
                <div className='flex justify-center items-center gap-10 w-full'>
                    <TaskTimer />
                    <TasksPanel />
                    <TaskMetric />
                </div>
                <TaskCardPanel openAddTaskModal={toggleDialog} />
            </main>
        </div>
    );
};

export default TaskPage;