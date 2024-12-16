import { ReactNode } from "react";

interface NavItemProps {
    icon: ReactNode; // Path to the icon image
    label: string; // Label for the navigation item
    handleClick?: any;
    currentItem?: string;
    itemValue?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, handleClick, currentItem, itemValue }) => {
    return (
        <div
            className={`flex items-center px-4 py-4 mt-3 mb-3 rounded-lg cursor-pointer ${currentItem?.trim()?.toLowerCase() === itemValue?.trim()?.toLowerCase() ? "bg-orange-100 text-black" : "hover:bg-gray-100"
                } gap-4`}
            onClick={() => handleClick(itemValue)}
        >

            <span >{icon}</span>
            <span className="text-2xl align-middle">{label}</span>
        </div>
    );
};

export default NavItem;