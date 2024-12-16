import React from "react";
import Header from "../components/Header";
import TaskTimer from "../components/TaskTimer";
import TasksPanel from "../components/TasksPanel";
import TaskMetric from "../components/TaskMetric";
import TaskCardPanel from "../components/TaskCardPanel";

const TaskPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 box-border">
            <Header />
            <main className="p-6 space-y-6">
                <div className='flex justify-center items-center gap-10 w-full'>
                    <TaskTimer />
                    <TasksPanel />
                    <TaskMetric />
                </div>
                <TaskCardPanel />
            </main>
        </div>
    );
};

export default TaskPage;