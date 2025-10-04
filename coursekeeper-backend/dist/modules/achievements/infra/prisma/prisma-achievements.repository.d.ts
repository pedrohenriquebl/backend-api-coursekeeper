import { IAchievementsRepository } from '../../domain/repositories/achievements.repository.interface';
import { Achievement } from '../../domain/entities/achievement.entity';
import { PrismaService } from 'src/prisma.service';
export declare class PrismaAchievementsRepository implements IAchievementsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Achievement[]>;
    findById(id: number): Promise<Achievement | null>;
    userHasAchievement(userId: number, achievementId: number): Promise<boolean>;
    assignToUser(userId: number, achievementId: number): Promise<void>;
}
