import { GoalStatus, GoalType, GoalUnits, Topic } from '@prisma/client';
export declare class Goal {
    id: number;
    isActive: boolean;
    title: string;
    type: GoalType;
    target: number;
    current: number;
    unit: GoalUnits;
    topic: Topic | null;
    deadline: Date;
    status: GoalStatus;
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date | null;
    description?: string | null;
    userId: number;
    streakAtStart?: number | null;
}
export interface LatestGoal {
    title: string;
    target: number;
    current: number;
    status: GoalStatus;
}
