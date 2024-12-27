import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

export const useAddTask = () => {
    const [loading, setLoading] = useState(false);

    const addTask = async (formData: any, toggleDialog: () => void) => {
        setLoading(true);
        try {
            const totalTimeRequiredSeconds = (formData.totalTimeRequired.hours * 60 + formData.totalTimeRequired.minutes) * 60;
            const dueDate = new Date(formData.dueDate).toISOString();
            const payload = { ...formData, totalTimeRequired: totalTimeRequiredSeconds, dueDate };

            const response = await axiosClient.post('/task/add', payload);
            toast.success('Task added');
            toggleDialog();
            return response.data;
        } catch (error) {
            console.error('Error adding Task:', error);
            toast.error('Failed to add task');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { addTask, loading };
};