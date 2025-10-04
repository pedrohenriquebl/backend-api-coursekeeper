import { Achievement } from "../entities/achievement.entity";
export interface IAchievementsRepository {
    findAll(): Promise<Achievement[]>;
    findById(id: number): Promise<Achievement | null>;
    userHasAchievement(userId: number, achievementId: number): Promise<boolean>;
    assignToUser(userId: number, achievementId: number): Promise<void>;
}
