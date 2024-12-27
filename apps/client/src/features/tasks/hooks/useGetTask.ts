import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";


export const useGetTask = (taskId: string) => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTask = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/task/${taskId}/get`);
            setTask(response.data);
        } catch (error) {
            console.error('Error fetching Task:', error);
            toast.error('Failed to fetch task');
        } finally {
            setLoading(false);
        }
    };

    return { task, fetchTask, loading };
};