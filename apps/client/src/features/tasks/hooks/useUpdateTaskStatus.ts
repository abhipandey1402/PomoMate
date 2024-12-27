import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";


export const useUpdateTaskStatus = () => {
    const [loading, setLoading] = useState(false);

    const updateTaskStatus = async (taskId: string, status: string) => {
        setLoading(true);
        try {
            const response = await axiosClient.patch(`/task/${taskId}/${status}/updateStatus`);
            toast.success('Task status updated');
            return response.data;
        } catch (error) {
            console.error('Error updating task status:', error);
            toast.error('Failed to update status');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { updateTaskStatus, loading };
};