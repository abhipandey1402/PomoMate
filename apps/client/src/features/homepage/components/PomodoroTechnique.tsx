import { Card, CardContent } from "@/components/ui/card";

type PomodoroTechnique = {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type PomodoroTechniqueCardProps = {
    pomodoroTechnique: PomodoroTechnique[]; // Wraps the array in an object as props
};

const PomodoroTechnique: React.FC<PomodoroTechniqueCardProps> = ({pomodoroTechnique}) => (
    <div className="container mx-auto px-10 py-24">
        <h2 className="text-5xl font-bold text-center text-white mb-6">
            The Power of Pomodoro for Developers
        </h2>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
            The Pomodoro Technique is more than just a timer—it's a scientifically-proven method that helps developers maintain focus, prevent burnout, and achieve consistent productivity through structured work intervals.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
            {pomodoroTechnique.map((item, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex justify-center mb-6">
                            <item.icon className="w-12 h-12 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-4 text-center">{item.title}</h3>
                        <p className="text-xl text-gray-400 text-center">{item.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

export default PomodoroTechnique;
