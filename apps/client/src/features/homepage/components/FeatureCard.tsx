import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type Feature = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
};

type FeatureCardProps = {
    features: Feature[]; // Wraps the array in an object as props
};

const FeatureCard: React.FC<FeatureCardProps> = ({features}) => (
    <div className="container mx-auto px-10 py-24">
        <h2 className="text-5xl font-bold text-center text-white mb-12">
            Packed with Developer-Focused Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features?.map((feature, index) => (
                <Card
                    key={index}
                    className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105"
                >
                    <CardContent className="p-6">
                        <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                        <h3 className="text-2xl font-semibold text-white mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-xl text-gray-400">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

export default FeatureCard;
