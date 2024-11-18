import { ArrowRight, Brain, Code, Coffee, Users } from "lucide-react";

const HowItWork = () => (
    <div className="container mx-auto px-10 py-10">
        <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 py-24 rounded-2xl">
            <div className="container mx-auto px-10">
                <h2 className="text-5xl font-bold text-center text-white mb-16">
                    How It Works
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { icon: Code, title: "Code Focus", description: "Start your coding session with customized timer intervals" },
                        { icon: Coffee, title: "Smart Breaks", description: "Take refreshing breaks with team activities" },
                        { icon: Brain, title: "Track Progress", description: "Monitor productivity and gather insights" },
                        { icon: Users, title: "Team Sync", description: "Collaborate and stay in sync with your team" }
                    ].map((step, index) => (
                        <div key={index} className="text-center relative">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-blue-900/50 flex items-center justify-center">
                                    <step.icon className="w-8 h-8 text-blue-400" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-semibold text-white mb-2">{step.title}</h3>
                            <p className="text-2xl text-gray-400">{step.description}</p>
                            {index < 3 && (
                                <ArrowRight className="hidden md:block absolute top-1/4 -right-4 text-blue-400 w-8 h-8" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default HowItWork;
