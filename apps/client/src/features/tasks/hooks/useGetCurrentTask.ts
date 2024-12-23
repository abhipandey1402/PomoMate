import axiosClient from "@/interceptors/axiosClient";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useGetCurrentTask = () => {
    const [currentTask, setCurrentTask] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCurrentTask = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(`/tasks/getCurrentTask`);
                setCurrentTask(response.data.data || null);
            } catch (err) {
                toast.error("Failed to fetch the current task.");
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentTask();
    }, []);

    return { currentTask, loading };
};

export default useGetCurrentTask;
