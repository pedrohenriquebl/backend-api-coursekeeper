import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { ConflictException, Inject } from '@nestjs/common';
import { CreateUserDto } from '../../presentation/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../presentation/dtos/update-user.dto';
import {
  LoginResponseDto,
  LoginUserDto,
} from '../../presentation/dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import type { ICourseRepository } from '../../../courses/domain/repositories/courses.repository.interface';
import { GoalService } from 'src/modules/goals/application/services/goal.service';
import { GoalStatus } from '@prisma/client';
import { LatestGoal } from 'src/modules/goals/domain/entities/goals.entity';

export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ICourseRepository')
    private readonly courseRepository: ICourseRepository,
    private readonly jwtService: JwtService,
    private readonly goalService: GoalService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const existingCpfUser = await this.userRepository.findByCpf(dto.cpf);

    if (existingCpfUser) {
      throw new ConflictException('Usuário com CPF já cadastrado');
    }

    const existingEmailUser = await this.userRepository.findByEmail(dto.email);
    if (existingEmailUser) {
      throw new ConflictException('Usuário com email já cadastrado');
    }

    const hashPassword: string = await bcrypt.hash(dto.password, 10);
    const user = new User(
      undefined,
      dto.firstName,
      dto.lastName,
      dto.email,
      hashPassword,
      dto.cpf,
      dto.profileImage ?? null,
      dto.description ?? null,
      new Date(),
      new Date(),
      null,
      null,
      null,
      null,
      0,
      0,
      null,
    );

    return this.userRepository.create(user);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;

    user.firstName = dto.firstName ?? user.firstName;
    user.lastName = dto.lastName ?? user.lastName;
    user.email = dto.email ?? user.email;
    user.cpf = dto.cpf ?? user.cpf;
    user.profileImage = dto.profileImage ?? user.profileImage;
    user.description = dto.description ?? user.description;
    user.website = dto.website ?? user.website;
    user.github = dto.github ?? user.github;
    user.linkedin = dto.linkedin ?? user.linkedin;

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    return this.userRepository.update(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return this.userRepository.findByCpf(cpf);
  }

  async restoreUser(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;

    user.deletedAt = null;

    return this.userRepository.update(user);
  }

  async softDeleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');

    user.deletedAt = new Date();

    await this.userRepository.update(user);
  }

  async login(loginDto: LoginUserDto): Promise<LoginResponseDto | null> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) return null;

    const now = new Date();
    let currentStreak = user.currentLoginStreak ?? 0;
    let maxStreak = user.maxLoginStreak ?? 0;

    if (user.lastLogin) {
      console.log(`Last Login: ${user.lastLogin}`);
      const lastLoginDate = new Date(user.lastLogin);
      const diffInDays = this.differenceInDays(now, lastLoginDate);

      if (diffInDays === 1) {
        currentStreak += 1;
        console.log(`diffInDays === 1 -> Current Streak incremented to: ${currentStreak}`);
      } else if (diffInDays > 1) {
        console.log(`diffInDays > 1 -> Current Streak reset to: 1`);
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }

    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
    }

    await this.userRepository.update({
      ...user,
      currentLoginStreak: currentStreak,
      maxLoginStreak: maxStreak,
      lastLogin: now,
    });

    const userId = user.id;

    if (!userId) return null;

    const courseStats = await this.getCourseStats(userId);
    const goalStats = await this.getGoalsStats(userId);

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    const { password, ...userWithoutPassword } = user;

    await this.goalService.updateGoalProgress(userId, 0, "", "");

    return {
      access_token: token,
      user: userWithoutPassword,
      courseStats,
      goalsStats: goalStats,
    };
  }

  async getCourseStats(userId: number) {
    const courses = await this.courseRepository.findAllByUser(userId);

    return {
      totalCourses: courses.length,
      totalCompletedCourses: courses.filter((c) => c.status === 'CONCLUIDO')
        .length,
      totalStudiedHours: courses.reduce(
        (sum, c) => sum + (c.studiedHours ?? 0),
        0,
      ),
    };
  }

  async getGoalsStats(userId: number) {
    const goals = await this.goalService.getAll(userId);

    const activeGoals = goals.filter((g) => g.isActive && g.status === 'ATIVA');
    const completedGoals = goals.filter(
      (g) => !g.isActive && g.status === GoalStatus.CONCLUIDA,
    );
    const totalGoals = activeGoals.length + completedGoals.length;

    let goalsProgressPercent = 0;

    if (totalGoals > 0) {
      const activeProgressSum = activeGoals.reduce(
        (sum, g) => sum + ((g.current ?? 0) / g.target) * 100,
        0,
      );

      const completedProgressSum = completedGoals.length * 100;

      goalsProgressPercent =
        (activeProgressSum + completedProgressSum) / totalGoals;
    }

    let latestGoal: LatestGoal | null = null;
    if (goals.length > 0) {
      const sortedGoals = [...goals].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
      const recent = sortedGoals[0];
      latestGoal = {
        title: recent.title,
        target: recent.target,
        current: recent.current,
        status: recent.status,
      };
    }

    return {
      goalsProgressPercent,
      latestGoal,
    };
  }

  private differenceInDays(date1: Date, date2: Date) {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diffTime = d1.getTime() - d2.getTime();
    return diffTime / (1000 * 60 * 60 * 24);
  }
}
