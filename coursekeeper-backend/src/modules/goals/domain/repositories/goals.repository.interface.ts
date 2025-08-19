import { Goal } from '../entities/goals.entity';

export interface IGoalsRepository {
  create(data: Partial<Goal>): Promise<Goal>;
  findById(id: number): Promise<Goal | null>;
  findAllByUser(userId: number): Promise<Goal[]>;
  update(id: number, data: Partial<Goal>): Promise<Goal>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Goal[]>;
}
