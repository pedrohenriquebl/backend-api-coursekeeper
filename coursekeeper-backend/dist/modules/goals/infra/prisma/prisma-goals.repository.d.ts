import { IGoalsRepository } from '../../domain/repositories/goals.repository.interface';
import { PrismaService } from 'src/prisma.service';
import { Goal } from '../../domain/entities/goals.entity';
export declare class PrismaGoalsRepository implements IGoalsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(goal: Goal): Promise<Goal>;
    findById(id: number): Promise<Goal | null>;
    findAllByUser(userId: number): Promise<Goal[]>;
    update(id: number, data: Partial<Goal>): Promise<Goal>;
    delete(id: number): Promise<void>;
    private toPrismaGoal;
    private fromPrismaGoal;
    findAll(): Promise<Goal[]>;
}
