import { GoalType, GoalUnits, Topic } from '@prisma/client';
export declare class CreateGoalDto {
    title: string;
    type: GoalType;
    topic?: Topic | null;
    target: number;
    unit: GoalUnits;
    deadline: Date;
    description?: string | null;
}
