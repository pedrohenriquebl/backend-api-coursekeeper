import { UserService } from '../../application/services/user.service';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { AuthService } from '../../../auth/auth.service';
import { Request } from 'express';
import { UpdateSubscriptionDto } from '../dtos/update-subscription.dto';
import { UpgradePlanDto } from '../dtos/upgrade-plan.dto';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    createUser(dto: CreateUserDto): Promise<User>;
    loginUser(loginDto: LoginUserDto): Promise<import("../dtos/login-user.dto").LoginResponseDto>;
    getMe(req: Request & {
        user: User;
    }): Promise<{
        subscriptionPlan: "FREE" | "GOLD" | "PLATINUM";
        subscriptionValidUntil: Date | null;
        generalCoursesInfo: {
            totalCourses: number;
            totalCompletedCourses: number;
            totalStudiedHours: number;
        };
        goalsStats: {
            goalsProgressPercent: number;
            latestGoal: import("../../../goals/domain/entities/goals.entity").LatestGoal | null;
        };
        id: number | undefined;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        cpf: string;
        profileImage?: string | null | undefined;
        description?: string | null | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        deletedAt?: (Date | null) | undefined;
        linkedin?: string | null | undefined;
        github?: string | null | undefined;
        website?: string | null | undefined;
        currentLoginStreak?: number | null | undefined;
        maxLoginStreak?: number | null | undefined;
        lastLogin?: (Date | null) | undefined;
        acceptedTermsAt?: (Date | null) | undefined;
        acceptedPrivacyAt?: (Date | null) | undefined;
    }>;
    uploadMyAvatar(file: Express.Multer.File, req: Request & {
        user: any;
    }): Promise<{
        path: string;
        user: User | null;
    }>;
    getUserById(id: string): Promise<User | null>;
    updateUser(id: string, dto: UpdateUserDto): Promise<User | null>;
    deleteUser(id: string): Promise<void>;
    updateSubscription(id: string, dto: UpdateSubscriptionDto): Promise<User>;
    upgradeSubscription(id: string, dto: UpgradePlanDto): Promise<User | null>;
}
