import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../../presentation/dtos/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../presentation/dtos/update-user.dto';
import { LoginResponseDto, LoginUserDto } from '../../presentation/dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import type { ICourseRepository } from '../../../courses/domain/repositories/courses.repository.interface';
import { GoalService } from 'src/modules/goals/application/services/goal.service';
import { SubscriptionPlan } from '@prisma/client';
import { LatestGoal } from 'src/modules/goals/domain/entities/goals.entity';
import { AchievementsService } from 'src/modules/achievements/application/services/achievements.service';
import { UpdateSubscriptionDto } from '../../presentation/dtos/update-subscription.dto';
import { PlanDuration } from '../../domain/enums/plan-duration.enum';
export declare class UserService {
    private readonly userRepository;
    private readonly courseRepository;
    private readonly jwtService;
    private readonly goalService;
    private readonly achievementsService;
    constructor(userRepository: IUserRepository, courseRepository: ICourseRepository, jwtService: JwtService, goalService: GoalService, achievementsService: AchievementsService);
    createUser(dto: CreateUserDto): Promise<User>;
    updateUser(id: string, dto: UpdateUserDto): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;
    restoreUser(id: string): Promise<User | null>;
    softDeleteUser(id: string): Promise<void>;
    login(loginDto: LoginUserDto): Promise<LoginResponseDto | null>;
    getCourseStats(userId: number): Promise<{
        totalCourses: number;
        totalCompletedCourses: number;
        totalStudiedHours: number;
    }>;
    getGoalsStats(userId: number): Promise<{
        goalsProgressPercent: number;
        latestGoal: LatestGoal | null;
    }>;
    updateSubscription(userId: number, dto: UpdateSubscriptionDto & {
        duration?: string;
    }): Promise<User>;
    upgradePlan(id: string, plan: SubscriptionPlan, duration: PlanDuration): Promise<User | null>;
    private calculateValidUntil;
    private checkSubscriptionExpiration;
    validateSubscription(user: User): Promise<User>;
    private differenceInDays;
}
