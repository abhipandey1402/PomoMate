import { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header: React.FC = () => {
    const [currentDay, setCurrentDay] = useState({
        date: 16,
        day: "Monday",
        month: "December"
    })

    return (
        <header className="flex justify-between items-center px-6 py-4">
            <div className='flex gap-4 items-center text-black'>
                <div className='bg-white p-3 text-black font-semibold text-2xl rounded-full w-12 h-12 flex justify-center items-center'>{currentDay?.date}</div>
                <div className='flex flex-col justify-center items-start'>
                    <span className="text-2xl font-bold">{currentDay?.day}</span>
                    <span className='text-lg'>{currentDay?.month}</span>
                </div>

            </div>
            <div className="flex items-center space-x-4">
                <button className="bg-orange-500 text-white text-2xl px-4 py-2 rounded-md">Create Task +</button>
                <FaBell className="text-4xl cursor-pointer" />
                <FaUserCircle className="text-4xl cursor-pointer" />
            </div>
        </header>
    );
};

export default Header;