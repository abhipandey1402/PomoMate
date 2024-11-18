import { Award, BarChart2, Brain, Cloud, Code, Timer, Users, Zap } from "lucide-react";

type Feature = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
};

type Testimonial = {
    name: string;
    role: string;
    content: string;
    avatar: string;
};

type PomodoroTechnique = {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type DeveloperFeature = {
    title: string;
    description: string;
    image: string;
    features: string[];
};

export const features: Feature[] = [
    {
        icon: Timer,
        title: "Smart Pomodoro Timer",
        description: "Customizable intervals with smart breaks and AI-powered suggestions",
    },
    {
        icon: Users,
        title: "Team Sync",
        description:
            "Real-time collaboration with voice & video calls during breaks",
    },
    {
        icon: Award,
        title: "Gamification",
        description:
            "Achievement system and team leaderboards to boost motivation",
    },
    {
        icon: BarChart2,
        title: "Advanced Analytics",
        description:
            "Detailed insights into productivity patterns and team performance",
    },
    {
        icon: Zap,
        title: "Smart Integrations",
        description: "Seamless sync with Jira, Trello, and other developer tools",
    },
    {
        icon: Cloud,
        title: "Secure Cloud Storage",
        description: "AWS-powered data sync with enterprise-grade security",
    },
];

export const testimonials: Testimonial[] = [
    {
        name: 'Sarah Chen',
        role: 'Senior Developer at TechCorp',
        content: 'This app transformed our remote team\'s productivity. The real-time collaboration features are game-changing.',
        avatar: 'SC',
    },
    {
        name: 'Mark Rodriguez',
        role: 'Tech Lead at StartupX',
        content: 'The integration with our existing tools made adoption seamless. Our team\'s focus improved by 40%.',
        avatar: 'MR',
    },
    {
        name: 'Lisa Kumar',
        role: 'Engineering Manager',
        content: 'The analytics helped us identify and eliminate productivity bottlenecks. Absolutely worth it!',
        avatar: 'LK',
    },
];

export const pomodoroTechnique: PomodoroTechnique[] = [
    {
        title: 'The Science Behind Pomodoro',
        description:
            'Based on neuroscience research, the Pomodoro Technique leverages your brain\'s natural focus and rest cycles. By working in focused 25-minute intervals, you maintain peak cognitive performance while preventing mental fatigue.',
        icon: Brain,
    },
    {
        title: 'Perfect for Developer Flow',
        description:
            'Developers need uninterrupted focus time for complex problem-solving. Our customized Pomodoro intervals respect your coding flow while ensuring you take necessary breaks to prevent burnout.',
        icon: Code,
    },
    {
        title: 'Data-Driven Productivity',
        description:
            'Track your most productive hours, analyze your focus patterns, and optimize your work schedule. Our AI suggests the best Pomodoro intervals based on your personal data.',
        icon: BarChart2,
    },
];

export const developerFeatures: DeveloperFeature[] = [
    {
        title: 'Study Together',
        description: 'Join focused study rooms with fellow developers. Share resources, discuss problems, and stay motivated with peer accountability.',
        image: 'https://img.freepik.com/free-photo/colleagues-doing-team-work-project_23-2149361536.jpg?semt=ais_hybrid',
        features: [
            'Virtual study rooms with video/audio options',
            'Code snippet sharing during breaks',
            'Collaborative problem-solving sessions',
            'Language-specific study groups',
        ],
    },
    {
        title: 'Smart Break Suggestions',
        description:
            'AI-powered break activities designed specifically for developers to maintain productivity and prevent coding fatigue.',
        image: 'https://img.freepik.com/free-photo/top-view-break-time-written-sticky-note-binder-clip-pen-biscuits-dark_140725-145628.jpg?semt=ais_hybrid',
        features: [
            'Quick stretching exercises for developers',
            'Mini code challenges to stay sharp',
            'Tech article recommendations',
            'Eye strain prevention reminders',
        ],
    },
    {
        title: 'Progress Tracking',
        description: 'Comprehensive insights into your development productivity and learning progress.',
        image: 'https://img.freepik.com/free-vector/progress-concept-illustration_114360-2976.jpg?semt=ais_hybrid',
        features: [
            'GitHub integration for code commit tracking',
            'Learning milestone achievements',
            'Focus time analytics by project',
            'Team productivity dashboards',
        ],
    },
];