import { Timer } from "lucide-react";

const Footer = () => (
    <footer className="bg-black/50 backdrop-blur-sm py-12 px-10">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex content-center items-center space-x-2 mb-4">
                        <Timer className="w-16 h-16 text-blue-400 animate-bounce" />
                        <span className="text-3xl font-bold text-white">PomoMate</span>
                    </div>
                    <p className="text-gray-400">Empowering developers to achieve more through focused work sessions.</p>
                </div>

            </div>
            <div className="text-xl border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                © 2024 PomoMate. All rights reserved.
            </div>
        </div>
    </footer>
);

export default Footer;
