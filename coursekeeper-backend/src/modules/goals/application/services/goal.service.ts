import { Inject, NotFoundException } from '@nestjs/common';
import type { IGoalsRepository } from '../../domain/repositories/goals.repository.interface';
import { Goal } from '../../domain/entities/goals.entity';
import { CreateGoalDto } from '../../presentation/dto/create-goals.dto';
import { GoalStatus, GoalType } from '@prisma/client';

export class GoalService {
  constructor(
    @Inject('IGoalsRepository')
    private goalsRepository: IGoalsRepository,
  ) {}

  async create(userId: number, dto: CreateGoalDto): Promise<Goal> {
    const goal = await this.goalsRepository.create({
      ...dto,
      userId,
      current: 0,
      isActive: true,
      status: GoalStatus.ATIVA,
      topic: dto.topic ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return goal;
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
    console.log('[GoalService] All user goals:', activeGoals);

    const filteredGoals = activeGoals.filter((goal) => goal.isActive);
    console.log('[GoalService] Active goals:', filteredGoals);

    const today = new Date();

    for (const goal of filteredGoals) {
      console.log(
        '[GoalService] Processing goal:',
        goal.id,
        goal.type,
        goal.topic,
      );

      let newCurrent = goal.current ?? 0;
      let newStatus = goal.status;
      let isActive = goal.isActive;

      if (
        goal.deadline &&
        goal.deadline < today &&
        goal.status !== GoalStatus.CONCLUIDA
      ) {
        console.log('[GoalService] Goal expired:', goal.id);
        await this.goalsRepository.update(goal.id, {
          status: GoalStatus.VENCIDA,
          isActive: false,
          updatedAt: new Date(),
        });
        continue;
      }

      console.log('[GoalService] Goal type:', goal.type);
      console.log(
        '[GoalService] Comparing topics - Goal:',
        goal.topic,
        'Course:',
        topic,
      );

      switch (goal.type as GoalType) {
        case 'HORAS_TOTAIS':
          console.log('[GoalService] Updating HORAS_TOTAIS goal');
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

          console.log('Comparing topics:', goalTopic, 'vs', courseTopic);

          if (goalTopic === courseTopic) {
            console.log('Topics match - updating goal:', goal.id);
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
}
