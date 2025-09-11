import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../domain/entities/user.entity';
import { LatestGoal } from 'src/modules/goals/domain/entities/goals.entity';
import { SubscriptionPlan } from '@prisma/client';

export class LoginUserDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginResponseDto {
  access_token: string;
  user: Omit<User, 'password'> & {
    subscriptionPlan: SubscriptionPlan;
    subscriptionValidUntil: Date | null;
  };

  courseStats?: {
    totalCourses: number;
    totalCompletedCourses: number;
    totalStudiedHours: number;
  };
  
  goalsStats?: {
    goalsProgressPercent: number;
    latestGoal: LatestGoal | null;
  };
}
