import { Injectable } from '@nestjs/common';
import { IAchievementsRepository } from '../../domain/repositories/achievements.repository.interface';
import { Achievement } from '../../domain/entities/achievement.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PrismaAchievementsRepository implements IAchievementsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Achievement[]> {
    const achievements = await this.prisma.client.achievement.findMany();
    return achievements.map(
      (a) =>
        new Achievement(
          a.id,
          a.code,
          a.name,
          a.description,
          a.icon ?? undefined,
          a.condition ? a.condition : undefined,
        ),
    );
  }

  async findById(id: number): Promise<Achievement | null> {
    const a = await this.prisma.client.achievement.findUnique({
      where: { id },
    });
    if (!a) return null;
    return new Achievement(
      a.id,
      a.code,
      a.name,
      a.description,
      a.icon ?? undefined,
      a.condition ? a.condition : undefined,
    );
  }

  async userHasAchievement(
    userId: number,
    achievementId: number,
  ): Promise<boolean> {
    const userAchievement = await this.prisma.client.userAchievement.findUnique(
      {
        where: { userId_achievementId: { userId, achievementId } },
      },
    );
    return !!userAchievement;
  }

  async assignToUser(userId: number, achievementId: number): Promise<void> {
    await this.prisma.client.userAchievement.create({
      data: { userId, achievementId },
    });
  }
}
