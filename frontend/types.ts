export interface User {
    id: string;
    name: string;
    college: string;
    avatar: string;
    age: number;
    citizenship: string;
}

export interface UserStats {
    xp: number;
    level: number;
    streak: number;
    badges: Badge[];
}

export interface Badge {
    id: string;
    name: string;
    icon: string;
    description: string;
    earnedAt?: Date;
}

export interface ModuleSlide {
    title: string;
    content: string;
    iconName?: string;
}

export interface Module {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    duration: string;
    completed: boolean;
    category: 'basics' | 'candidates' | 'fact-check';
    slides: ModuleSlide[];
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

export interface LeaderboardEntry {
    id: string;
    name: string;
    college: string;
    xp: number;
    avatar: string;
}

export enum Tab {
    DASHBOARD = 'dashboard',
    CIVIC_BOT = 'civic_bot',
    LEARN = 'learn',
    LEADERBOARD = 'leaderboard'
}
