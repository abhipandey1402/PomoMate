import { Check } from "lucide-react";
import React from "react";


type DeveloperFeature = {
    title: string;
    description: string;
    image: string;
    features: string[];
};

type DeveloperFeatureCardProps = {
    developerFeatures: DeveloperFeature[]; // Wraps the array in an object as props
};

const DeveloperFeature: React.FC<DeveloperFeatureCardProps> = ({developerFeatures}) => (
    <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 px-10 py-24 mx-10">
        <div className="container mx-auto px-8">
            <h2 className="text-5xl font-bold text-center text-white mb-16">
                Built for Developer Success
            </h2>
            {developerFeatures.map((feature, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center mb-24 last:mb-0`}>
                    <div className="w-full md:w-1/2">
                        <img src={feature.image} alt={feature.title} className="rounded-lg shadow-2xl w-full" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-5xl font-bold text-white mb-4">{feature.title}</h3>
                        <p className="text-2xl text-gray-300 mb-6">{feature.description}</p>
                        <ul className="space-y-4">
                            {feature.features.map((item, i) => (
                                <li key={i} className="flex items-center text-xl text-gray-300">
                                    <Check className="w-5 h-5 text-blue-400 mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default DeveloperFeature;
