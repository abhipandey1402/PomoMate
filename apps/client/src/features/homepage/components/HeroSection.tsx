import { Star, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
    <div className="container mx-auto px-10 pt-32 pb-24">
        <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-6">
                <Star className="w-12 h-12 text-yellow-400 animate-pulse" />
            </div>
            <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
                Developer Pomodoro
            </h1>
            <p className="text-gray-300 text-2xl mb-8 leading-relaxed">
                Elevate your team's productivity with an AI-powered time management platform designed specifically for developers.
                Seamlessly integrate with your workflow and boost focus with smart features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-8 rounded-lg text-2xl font-semibold flex content-center">
                    Start Free Trial <ArrowRight className="ml-2" />
                </Button>
                <Button variant="outline" className="text-2xl border-gray-800 text-gray-800 hover:bg-gray-950 hover:text-white px-8 py-8 flex content-center">
                    Watch Demo <Play className="ml-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    </div>
);

export default HeroSection;
