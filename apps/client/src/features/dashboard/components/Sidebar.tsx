import React from "react";
import { HomeIcon, CalendarIcon, SettingsIcon, MessageSquareIcon, ClipboardListIcon, Timer, Gamepad2Icon, TrophyIcon, BellIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCurrentItem } from "@/features/globalFeatures/slices/configSlice";
import { BsPeopleFill } from "react-icons/bs";
import NavItem from "./NavItem";


const Sidebar: React.FC = () => {
    const currentItem = useSelector((state: RootState) => state.config?.currentItem);
    const dispatch = useDispatch();

    const handleItemClick = (item: string) => {
        dispatch(setCurrentItem(item));
    };

    return (
        <div style={{ height: 'calc(100vh - 3rem)' }} className="bg-white shadow-md w-[23rem] rounded-3xl fixed left-4 top-6 p-6 flex flex-col box-border">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => dispatch(setCurrentItem("dashboard"))} >
                <Timer className="w-16 h-16 text-orange-500 animate-bounce" />
                <span className="text-3xl font-bold cursor-pointer mb-8">PomoMate</span>
            </div>
            <nav>
                <NavItem icon={<HomeIcon size={20} />} label="Dashboard" handleClick={handleItemClick} currentItem={currentItem} itemValue="dashboard" />
                <NavItem icon={<ClipboardListIcon size={20} />} label="Tasks" handleClick={handleItemClick} currentItem={currentItem} itemValue="tasks" />
                <NavItem icon={<CalendarIcon size={20} />} label="Calendar" handleClick={handleItemClick} currentItem={currentItem} itemValue="calendar" />
                <NavItem icon={<BsPeopleFill size={20} />} label="Community" handleClick={handleItemClick} currentItem={currentItem} itemValue="community" />
                <NavItem icon={<MessageSquareIcon size={20} />} label="Chats" handleClick={handleItemClick} currentItem={currentItem} itemValue="chats" />
                <NavItem icon={<Gamepad2Icon size={20} />} label="Break & Play" handleClick={handleItemClick} currentItem={currentItem} itemValue="breakPlay" />
                <NavItem icon={<TrophyIcon size={20} />} label="Achievements" handleClick={handleItemClick} currentItem={currentItem} itemValue="achievements" />
                <NavItem icon={<BellIcon size={20} />} label="Notifications" handleClick={handleItemClick} currentItem={currentItem} itemValue="notifications" />
                <NavItem icon={<SettingsIcon size={20} />} label="Settings" handleClick={handleItemClick} currentItem={currentItem} itemValue="settings" />
            </nav>
        </div>
    );
};

export default Sidebar;
