import { GoalService } from '../../application/services/goal.service';
import { CreateGoalDto } from '../dto/create-goals.dto';
export declare class GoalsController {
    private readonly goalService;
    constructor(goalService: GoalService);
    create(userId: number, dto: CreateGoalDto): Promise<import("../../domain/entities/goals.entity").Goal>;
    getOverview(userId: number): Promise<import("../dto/get-overview-dto").GoalOverviewDto>;
    findAll(userId: number): Promise<import("../../domain/entities/goals.entity").Goal[]>;
    findOne(id: number, userId: number): Promise<import("../../domain/entities/goals.entity").Goal>;
    update(userId: number, id: number, dto: Partial<CreateGoalDto>): Promise<import("../../domain/entities/goals.entity").Goal>;
    remove(userId: number, id: number): Promise<void>;
}
