import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { IAchievementsRepository } from '../../domain/repositories/achievements.repository.interface';
import { GoalService } from 'src/modules/goals/application/services/goal.service';
import { UserService } from 'src/modules/user/application/services/user.service';
import { CourseService } from 'src/modules/courses/application/services/courses.service';
import { Achievement } from '../../domain/entities/achievement.entity';

interface AchievementCondition {
  type: string;
  target?: number;
  topic?: string;
}

@Injectable()
export class AchievementsService {
  constructor(
    @Inject('IAchievementsRepository')
    private readonly achievementsRepo: IAchievementsRepository,
    private readonly goalService: GoalService,
    private readonly courseService: CourseService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  /**
   * Avalia todas as conquistas e atribui ao usuário se a condição for atendida
   */
  async checkAndAssign(userId: number): Promise<void> {
    const achievements = await this.achievementsRepo.findAll();
    const user = await this.userService.findById(String(userId));
    const courses = await this.courseService.findAllByUserSimple(userId);
    const goals = await this.goalService.getAll(userId);

    for (const achievement of achievements) {
      const has = await this.achievementsRepo.userHasAchievement(
        userId,
        achievement.id,
      );

      if (has) continue;

      if (!achievement.condition) {
        continue;
      }

      let unlocked = false;
      let condition: AchievementCondition;

      try {
        condition = JSON.parse(achievement.condition);
      } catch {
        console.warn(
          `Invalid condition JSON for achievement ${achievement.code}`,
        );
        continue;
      }

      switch (condition.type) {
        case 'COURSES_COMPLETED':
          unlocked =
            courses.filter(
              (c) =>
                c.status === 'CONCLUIDO' &&
                (!condition.topic ||
                  c.topic?.toUpperCase() === condition.topic.toUpperCase()),
            ).length >= (condition.target ?? 0);
          break;

        case 'TOTAL_HOURS':
          unlocked =
            courses.reduce((sum, c) => sum + (c.studiedHours ?? 0), 0) >=
            (condition.target ?? 0);
          break;

        case 'STREAK':
          unlocked = (user?.currentLoginStreak ?? 0) >= (condition.target ?? 0);
          break;

        case 'GOALS_COMPLETED':
          unlocked =
            goals.filter((g) => g.status === 'CONCLUIDA').length >=
            (condition.target ?? 0);
          break;

        case 'GOALS_COMPLETED_ALL':
          unlocked =
            goals.length > 0 && goals.every((g) => g.status === 'CONCLUIDA');
          break;

        case 'HORAS_TOTAIS':
          unlocked =
            goals
              .filter((g) => g.type === 'HORAS_TOTAIS')
              .reduce((sum, g) => sum + (g.current ?? 0), 0) >=
            (condition.target ?? 0);
          break;

        case 'HORAS_TOPICO':
          unlocked =
            goals
              .filter(
                (g) =>
                  g.type === 'HORAS_TOPICO' &&
                  (!condition.topic ||
                    g.topic?.toUpperCase() === condition.topic.toUpperCase()),
              )
              .reduce((sum, g) => sum + (g.current ?? 0), 0) >=
            (condition.target ?? 0);
          break;

        case 'CURSOS_CONCLUIDOS':
          unlocked =
            goals
              .filter((g) => g.type === 'CURSOS_CONCLUIDOS')
              .reduce((sum, g) => sum + (g.current ?? 0), 0) >=
            (condition.target ?? 0);
          break;

        case 'PERIODO_ESTUDO': {
          const streakAtStart =
            goals.find((g) => g.type === 'PERIODO_ESTUDO')?.streakAtStart ?? 0;
          const currentStreak = user?.currentLoginStreak ?? 0;
          unlocked = currentStreak - streakAtStart >= (condition.target ?? 0);
          break;
        }

        default:
          console.warn(`Unknown condition type: ${condition.type}`);
      }

      if (unlocked) {
        await this.achievementsRepo.assignToUser(userId, achievement.id);
      }
    }
  }

  async listUserAchievements(
    userId: number,
  ): Promise<{ achievement: Achievement; unlocked: boolean }[]> {
    const allAchievements = await this.achievementsRepo.findAll();
    const result: { achievement: Achievement; unlocked: boolean }[] = [];

    for (const achievement of allAchievements) {
      const unlocked = await this.achievementsRepo.userHasAchievement(
        userId,
        achievement.id,
      );
      if (unlocked) {
        result.push({ achievement, unlocked });
      }
    }

    return result;
  }

  async listAllAchievements(): Promise<Achievement[]> {
    return this.achievementsRepo.findAll();
  }
}
