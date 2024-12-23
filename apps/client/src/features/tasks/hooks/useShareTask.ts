import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";


export const useShareTask = () => {
    const [loading, setLoading] = useState(false);

    const shareTask = async (taskId: string, userId: string) => {
        setLoading(true);
        try {
            const response = await axiosClient.post(`/task/${taskId}/share`, { userId });
            toast.success('Task shared');
            return response.data;
        } catch (error) {
            console.error('Error sharing task:', error);
            toast.error('Failed to share task');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { shareTask, loading };
};