import { Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const NavigationBar = () => {
    const Navigate = useNavigate();

    const handleNavigateToAuth = () => {
        Navigate("/auth");
    }

    return (
        <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md">
            <div className="container mx-auto px-10 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Timer className="w-16 h-16 text-blue-400 animate-bounce" />
                        <span className="text-5xl font-bold text-white cursor-pointer">PomoMate</span>
                    </div>
                    <div className="text-2xl hidden md:flex space-x-8">
                        {["Features", "Pricing", "Team", "Documentation"].map((item) => (
                            <span key={item} className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer">
                                {item}
                            </span>
                        ))}
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 rounded-lg text-xl font-semibold" onClick={handleNavigateToAuth}>Sign In</Button>
                </div>
            </div>
        </nav>
    )
};

export default NavigationBar;
