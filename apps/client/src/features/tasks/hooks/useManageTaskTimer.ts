import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";


export const useManageTaskTimer = () => {
    const [loading, setLoading] = useState(false);

    const manageTaskTimer = async (taskId: string, action: 'start' | 'stop') => {
        setLoading(true);
        try {
            const response = await axiosClient.patch(`/task/${taskId}/timer`, { action });
            toast.success(`Task timer ${action === 'start' ? 'started' : 'stopped'}`);
            return response.data;
        } catch (error) {
            console.error('Error managing task timer:', error);
            toast.error('Failed to manage timer');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { manageTaskTimer, loading };
};