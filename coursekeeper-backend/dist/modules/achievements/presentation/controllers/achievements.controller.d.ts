import { AchievementsService } from '../../application/services/achievements.service';
export declare class AchievementsController {
    private readonly achievementsService;
    constructor(achievementsService: AchievementsService);
    check(userId: string): Promise<{
        message: string;
    }>;
    listUserAchievements(userId: string): Promise<{
        achievement: import("../../domain/entities/achievement.entity").Achievement;
        unlocked: boolean;
    }[]>;
    listAllAchievements(): Promise<import("../../domain/entities/achievement.entity").Achievement[]>;
}
