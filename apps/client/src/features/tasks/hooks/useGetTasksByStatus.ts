import axiosClient from "@/interceptors/axiosClient";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useGetTasksByStatus = (status: string) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTasksByStatus = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(`/tasks/${status}/getByStatus`);
                setTasks(response.data.data || []);
            } catch (err) {
                toast.error("Failed to fetch tasks by status.");
            } finally {
                setLoading(false);
            }
        };

        if (status) {
            fetchTasksByStatus();
        }
    }, [status]);

    return { tasks, loading };
};

export default useGetTasksByStatus;
