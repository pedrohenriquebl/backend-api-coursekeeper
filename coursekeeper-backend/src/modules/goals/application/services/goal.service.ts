import { Inject, NotFoundException } from '@nestjs/common';
import type { IGoalsRepository } from '../../domain/repositories/goals.repository.interface';
import { Goal } from '../../domain/entities/goals.entity';
import { CreateGoalDto } from '../../presentation/dto/create-goals.dto';
import { GoalStatus, GoalType } from '@prisma/client';
import { GoalOverviewDto } from '../../presentation/dto/get-overview-dto';

export class GoalService {
  constructor(
    @Inject('IGoalsRepository')
    private goalsRepository: IGoalsRepository,
  ) {}

  async create(userId: number, dto: CreateGoalDto): Promise<Goal> {
    try {
      return await this.goalsRepository.create({
        ...dto,
        userId,
        current: 0,
        isActive: true,
        deadline: new Date(dto.deadline),
        status: GoalStatus.ATIVA,
        topic: dto.topic ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Erro ao criar goal:', error);
      throw error;
    }
  }

  async getAll(userId: number): Promise<Goal[]> {
    const goals = await this.goalsRepository.findAllByUser(userId);
    return goals ?? [];
  }

  async getById(id: number, userId: number): Promise<Goal> {
    const goal = await this.goalsRepository.findById(id);
    if (!goal || goal.userId !== userId) {
      throw new NotFoundException('Meta não encontrada');
    }
    return goal;
  }

  async update(id: number, userId: number, data: Partial<Goal>): Promise<Goal> {
    const goal = await this.getById(id, userId);
    return this.goalsRepository.update(goal.id, data);
  }

  async delete(id: number, userId: number): Promise<void> {
    const goal = await this.getById(id, userId);
    await this.goalsRepository.delete(goal.id);
  }

  async updateGoalProgress(
    userId: number,
    studiedHoursDiff: number,
    topic?: string,
    courseStatus?: string,
  ): Promise<void> {
    const activeGoals = await this.goalsRepository.findAllByUser(userId);
    const filteredGoals = activeGoals.filter((goal) => goal.isActive);

    const today = new Date();

    for (const goal of filteredGoals) {
      let newCurrent = goal.current ?? 0;
      let newStatus = goal.status;
      let isActive = goal.isActive;

      if (
        goal.deadline &&
        goal.deadline < today &&
        goal.status !== GoalStatus.CONCLUIDA
      ) {
        await this.goalsRepository.update(goal.id, {
          status: GoalStatus.VENCIDA,
          isActive: false,
          updatedAt: new Date(),
        });
        continue;
      }

      switch (goal.type as GoalType) {
        case 'HORAS_TOTAIS':
          newCurrent += studiedHoursDiff;
          if (newCurrent >= goal.target) {
            newCurrent = goal.target;
            newStatus = GoalStatus.CONCLUIDA;
            isActive = false;
          }
          break;

        case 'HORAS_TOPICO':
          const goalTopic = goal.topic?.toUpperCase().trim();
          const courseTopic = topic?.toUpperCase().trim();

          if (goalTopic === courseTopic) {
            newCurrent = Math.max(0, (goal.current ?? 0) + studiedHoursDiff);
            if (newCurrent >= goal.target) {
              newCurrent = goal.target;
              newStatus = GoalStatus.CONCLUIDA;
              isActive = false;
            }
          }
          break;

        case 'CURSOS_CONCLUIDOS':
          if (courseStatus === 'CONCLUIDO') {
            newCurrent += 1;
            if (newCurrent >= goal.target) {
              newCurrent = goal.target;
              newStatus = GoalStatus.CONCLUIDA;
              isActive = false;
            }
          }
          break;

        case 'PERIODO_ESTUDO':
          const lastUpdate = goal.updatedAt;
          const lastUpdateDay = lastUpdate ? lastUpdate.getDate() : null;
          const lastUpdateMonth = lastUpdate ? lastUpdate.getMonth() : null;
          const lastUpdateYear = lastUpdate ? lastUpdate.getFullYear() : null;

          if (
            !lastUpdate ||
            lastUpdateDay !== today.getDate() ||
            lastUpdateMonth !== today.getMonth() ||
            lastUpdateYear !== today.getFullYear()
          ) {
            newCurrent += 1;
            if (newCurrent >= goal.target) {
              newCurrent = goal.target;
              newStatus = GoalStatus.CONCLUIDA;
              isActive = false;
            }
          }
          break;
      }

      await this.goalsRepository.update(goal.id, {
        current: newCurrent,
        status: newStatus,
        isActive,
        updatedAt: new Date(),
      });
    }
  }

  async getOverview(userId: number): Promise<GoalOverviewDto> {
    const goals = await this.getAll(userId);

    const activeGoals = goals.filter(
      (g) => g.isActive && g.status === GoalStatus.ATIVA,
    );

    const inactiveGoals = goals.filter(
      (g) => !g.isActive && g.status === GoalStatus.VENCIDA,
    );

    const completedGoals = goals.filter(
      (g) => !g.isActive && g.status === GoalStatus.CONCLUIDA,
    );

    const hourGoals = goals.filter(
      (g) =>
        g.type === GoalType.HORAS_TOTAIS || g.type === GoalType.HORAS_TOPICO,
    );

    const studiedHours = hourGoals.reduce(
      (sum, g) => sum + (g.current ?? 0),
      0,
    );
    const targetHours = hourGoals.reduce((sum, g) => sum + (g.target ?? 0), 0);

    return {
      activeGoals: activeGoals.length,
      goalsCompleted: completedGoals.length,
      goalsRating:
        (completedGoals.length /
          (activeGoals.length + completedGoals.length + inactiveGoals.length || 1)) *
        100,
      totalProgressInHours: studiedHours,
      totalGoalInHours: targetHours,
    };
  }

  async getAllUsers(): Promise<{ id: number }[]> {
    const goals = await this.goalsRepository.findAll();
    const userIds = Array.from(new Set(goals.map((g) => g.userId)));
    return userIds.map((id) => ({ id }));
  }
}
