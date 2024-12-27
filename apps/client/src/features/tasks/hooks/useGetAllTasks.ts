import axiosClient from "@/interceptors/axiosClient";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export const useGetAllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAllTasks = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/task/getAll');
            setTasks(response?.data?.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, [])

    return { tasks, loading };
};