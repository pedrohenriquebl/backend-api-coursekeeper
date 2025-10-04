import { Injectable } from '@nestjs/common';
import { IGoalsRepository } from '../../domain/repositories/goals.repository.interface';
import { PrismaService } from 'src/prisma.service';
import { Goal } from '../../domain/entities/goals.entity';
import { GoalStatus, GoalType } from '@prisma/client';

@Injectable()
export class PrismaGoalsRepository implements IGoalsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(goal: Goal): Promise<Goal> {
    return this.prisma.client.goal.create({ data: goal }) as unknown as Goal;
  }

  async findById(id: number): Promise<Goal | null> {
    return this.prisma.client.goal.findUnique({
      where: { id },
    }) as unknown as Goal;
  }

  async findAllByUser(userId: number): Promise<Goal[]> {
    return this.prisma.client.goal.findMany({
      where: { userId },
    }) as unknown as Goal[];
  }

  async update(id: number, data: Partial<Goal>): Promise<Goal> {
    const cleanData = this.toPrismaGoal(data);

    const updatedGoal = await this.prisma.client.goal.update({
      where: { id },
      data: cleanData,
    });

    return this.fromPrismaGoal(updatedGoal);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.client.goal.delete({ where: { id } });
  }

  private toPrismaGoal(goal: Partial<Goal>): any {
    return {
      ...goal,
      status: goal.status as GoalStatus,
      type: goal.type as GoalType,
      current: goal.current !== undefined ? Number(goal.current) : undefined,
      target: goal.target !== undefined ? Number(goal.target) : undefined,
      deadline: goal.deadline ? new Date(goal.deadline) : undefined,
      createdAt: goal.createdAt ? new Date(goal.createdAt) : undefined,
      updatedAt: goal.updatedAt ? new Date(goal.updatedAt) : undefined,
      completedAt: goal.completedAt ? new Date(goal.completedAt) : undefined,
    };
  }

  private fromPrismaGoal(goal: any): Goal {
    return {
      ...goal,
      status: goal.status as GoalStatus,
      type: goal.type as GoalType,
      deadline: goal.deadline ? new Date(goal.deadline) : null,
      createdAt: new Date(goal.createdAt),
      updatedAt: new Date(goal.updatedAt),
      completedAt: goal.completedAt ? new Date(goal.completedAt) : null,
    };
  }

  findAll(): Promise<Goal[]> {
    return this.prisma.client.goal.findMany() as unknown as Promise<Goal[]>;
  }
}
