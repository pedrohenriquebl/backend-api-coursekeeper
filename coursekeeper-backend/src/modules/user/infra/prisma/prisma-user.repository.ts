import { PrismaService } from '../../../../prisma.service';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
    if (!user) return null;
    return new User(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.cpf,
      user.profileImage,
      user.description,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
      user.linkedin,
      user.github,
      user.website,
      user.currentLoginStreak ?? 0,
      user.maxLoginStreak ?? 0,
      user.lastLogin ?? null,
      user.subscriptionPlan,
      user.subscriptionValidUntil
    );
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        cpf: user.cpf,
        profileImage: user.profileImage,
        description: user.description,
        linkedin: user.linkedin,
        github: user.github,
        website: user.website,
        currentLoginStreak: user.currentLoginStreak ?? 0,
        maxLoginStreak: user.maxLoginStreak ?? 0,
        lastLogin: user.lastLogin ?? null,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionValidUntil: user.subscriptionValidUntil ?? null,
      },
    });
    return new User(
      createdUser.id,
      createdUser.firstName,
      createdUser.lastName,
      createdUser.email,
      createdUser.password,
      createdUser.cpf,
      createdUser.profileImage,
      createdUser.description,
      createdUser.createdAt,
      createdUser.updatedAt,
      createdUser.deletedAt,
      createdUser.linkedin,
      createdUser.github,
      createdUser.website,
      createdUser.currentLoginStreak,
      createdUser.maxLoginStreak,
      createdUser.lastLogin,
      createdUser.subscriptionPlan,
      createdUser.subscriptionValidUntil
    );
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        cpf: user.cpf,
        profileImage: user.profileImage,
        description: user.description,
        linkedin: user.linkedin,
        github: user.github,
        website: user.website,
        currentLoginStreak: user.currentLoginStreak ?? 0,
        maxLoginStreak: user.maxLoginStreak ?? 0,
        lastLogin: user.lastLogin ?? undefined,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionValidUntil: user.subscriptionValidUntil ?? null,
      },
    });
    return new User(
      updatedUser.id,
      updatedUser.firstName,
      updatedUser.lastName,
      updatedUser.email,
      updatedUser.password,
      updatedUser.cpf,
      updatedUser.profileImage,
      updatedUser.description,
      updatedUser.createdAt,
      updatedUser.updatedAt,
      updatedUser.deletedAt,
      updatedUser.linkedin,
      updatedUser.github,
      updatedUser.website,
      updatedUser.currentLoginStreak,
      updatedUser.maxLoginStreak,
      updatedUser.lastLogin,
      updatedUser.subscriptionPlan,
      updatedUser.subscriptionValidUntil
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: Number(id),
        deletedAt: null,
      },
    });
    if (!user) return null;
    return new User(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.cpf,
      user.profileImage,
      user.description,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
      user.linkedin,
      user.github,
      user.website,
      user.currentLoginStreak ?? 0,
      user.maxLoginStreak ?? 0,
      user.lastLogin ?? null,
      user.subscriptionPlan,
      user.subscriptionValidUntil
    );
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        cpf,
        deletedAt: null,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
  }
}
