import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";


export const useDeleteTask = () => {
    const [loading, setLoading] = useState(false);

    const deleteTask = async (taskId: string) => {
        setLoading(true);
        try {
            await axiosClient.delete(`/task/${taskId}`);
            toast.success('Task deleted');
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { deleteTask, loading };
};