import { User } from '../../domain/entities/user.entity';
import { LatestGoal } from 'src/modules/goals/domain/entities/goals.entity';
import { SubscriptionPlan } from '@prisma/client';
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class LoginResponseDto {
    access_token: string;
    user: Omit<User, 'password'> & {
        subscriptionPlan: SubscriptionPlan;
        subscriptionValidUntil: Date | null;
    };
    courseStats?: {
        totalCourses: number;
        totalCompletedCourses: number;
        totalStudiedHours: number;
    };
    goalsStats?: {
        goalsProgressPercent: number;
        latestGoal: LatestGoal | null;
    };
}
