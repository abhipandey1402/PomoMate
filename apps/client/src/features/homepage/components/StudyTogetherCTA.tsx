import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const StudyTogetherCTA = () => (
    <div className="container mx-auto px-10 py-24">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-12 text-center">
            <div className="flex justify-center mb-6">
                <Users className="w-16 h-16 text-blue-400" />
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">
                Never Code Alone
            </h2>
            <p className="text-gray-300 text-2xl mb-8 max-w-2xl mx-auto">
                Join our global community of developers. Study together, share knowledge, and stay motivated with peer accountability. Transform solitary coding sessions into collaborative learning experiences.
            </p>
            <Button className="text-2xl bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">
                Join Developer Community
            </Button>
        </div>
    </div>
);

export default StudyTogetherCTA;
