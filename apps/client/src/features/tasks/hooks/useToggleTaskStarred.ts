import axiosClient from "@/interceptors/axiosClient";
import { useState } from "react";
import { toast } from "react-toastify";

const useToggleTaskStarred = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const toggleTaskStarred = async (taskId: string): Promise<void> => {
        setLoading(true);
        try {
            await axiosClient.patch(`/tasks/${taskId}/star`);
        } catch (err) {
            toast.error("Failed to toggle task starred status.");
        } finally {
            setLoading(false);
        }
    };

    return { toggleTaskStarred, loading };
};

export default useToggleTaskStarred;
