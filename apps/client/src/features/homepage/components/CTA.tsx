import { Button } from "@/components/ui/button";
import { ArrowRight, HeadphonesIcon } from "lucide-react";

const CTA = () => (
    <div className="container mx-auto px-10 py-24 text-center">
        <div className="container max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6">
                Ready to Transform Your Team's Productivity?
            </h2>
            <p className="text-gray-400 mb-8 text-2xl">
                Join thousands of developers who have improved their focus and efficiency with our platform.
                Start your free trial today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-8 rounded-lg text-2xl font-semibold flex content-center">
                    Start Free Trial <ArrowRight className="ml-2" />
                </Button>
                <Button variant="outline" className="text-2xl border-gray-800 text-gray-800 hover:bg-gray-950 hover:text-white px-8 py-8 flex content-center">
                    Request Demo <HeadphonesIcon className="ml-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    </div>
);

export default CTA;
