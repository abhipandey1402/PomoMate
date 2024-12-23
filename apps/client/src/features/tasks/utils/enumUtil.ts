
export interface TeamMember {
    initials: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    ownerId: string;
    isPublic: boolean;
    teamId: string | null;
    createdAt: string;
    updatedAt: string;
    totalTimeRequired: number;
    timeWorked: number;
    timeWorkedToday: number;
    remainingTime: number;
    isTaskStarred: boolean;
    dueDate: string;
    isBeingWorkedOn: boolean;
    sharedWithUserIds: string[];
    timerStartTime: string | null;
    timerEndTime: string | null;
}

export interface TaskGroup {
    status: string;
    items: {
        title: string;
        duration: string;
        team: { initials: string }[];
        description: string;
        isTaskStarred: boolean;
    }[];
}

export interface TimerTask {
    title: string;
    status: 'notStarted' | 'inProgress' | 'completed';
    duration: string;
}