import type { IGoalsRepository } from '../../domain/repositories/goals.repository.interface';
import { Goal } from '../../domain/entities/goals.entity';
import { CreateGoalDto } from '../../presentation/dto/create-goals.dto';
import { GoalOverviewDto } from '../../presentation/dto/get-overview-dto';
import type { IUserRepository } from 'src/modules/user/domain/repositories/user.repository.interface';
export declare class GoalService {
    private goalsRepository;
    private userRepository;
    constructor(goalsRepository: IGoalsRepository, userRepository: IUserRepository);
    create(userId: number, dto: CreateGoalDto): Promise<Goal>;
    private getActiveGoalsLimit;
    getAll(userId: number): Promise<Goal[]>;
    getById(id: number, userId: number): Promise<Goal>;
    update(id: number, userId: number, data: Partial<Goal>): Promise<Goal>;
    delete(id: number, userId: number): Promise<void>;
    updateGoalProgress(userId: number, studiedHoursDiff: number, topic?: string, courseStatus?: string): Promise<void>;
    getOverview(userId: number): Promise<GoalOverviewDto>;
    getAllUsers(): Promise<{
        id: number;
    }[]>;
}
