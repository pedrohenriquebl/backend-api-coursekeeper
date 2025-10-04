import { GoalService } from '../services/goal.service';
export declare class GoalCronService {
    private readonly goalService;
    private readonly logger;
    constructor(goalService: GoalService);
    handleDailyGoalUpdate(): Promise<void>;
}
