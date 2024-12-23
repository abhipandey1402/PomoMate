import TaskPage from "@/features/tasks/pages/TaskPage";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";
import { setCurrentItem } from "@/features/globalFeatures/slices/configSlice";
import ChatPage from "@/features/chat/pages/ChatPage";

const Dashboard = () => {
    const currentItem = useSelector((state: RootState) => state.config?.currentItem);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            if (event.currentTarget.performance.navigation.type === 1) {
                dispatch(setCurrentItem("dashboard"));
            }
        };

        window.addEventListener("load", handleBeforeUnload);
        return () => {
            window.removeEventListener("load", handleBeforeUnload);
        };
    }, [dispatch]);

    const renderCurrentContent = () => {
        switch (currentItem) {
            case "dashboard":
                return <span>Dashboard</span>;
            case "tasks":
                return <TaskPage />
            case "calendar":
                return <span>Calendar</span>
            case "community":
                return <span>Community</span>
            case "chats":
                return <ChatPage/>
            case "breakPlay":
                return <span>Break & Play</span>
            case "achievements":
                return <span>Achievements</span>
            case "notifications":
                return <span>Notifications</span>
            case "settings":
                return <span>Settings</span>
            default:
                return null;
        }
    }

    return (
        <div className="w-full bg-gray-100 flex box-border">
            <Sidebar />
            <div style={{ maxHeight: 'calc(20rem)', width: 'calc(100vw - 24rem)' }} className="ml-96">
                {renderCurrentContent()}
            </div>
        </div>
    )
}

export default Dashboard;