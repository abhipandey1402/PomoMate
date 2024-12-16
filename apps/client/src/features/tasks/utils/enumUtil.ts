
export interface TeamMember {
    initials: string;
}

export interface Task {
    title: string;
    duration: string;
    team: TeamMember[];
}

export interface TaskGroup {
    status: string;
    items: Task[];
}

export interface TimerTask {
    title: string;
    status: 'notStarted' | 'inProgress' | 'completed';
    duration: string;
}