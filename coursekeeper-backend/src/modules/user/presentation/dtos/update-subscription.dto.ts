import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum SubscriptionPlan {
  FREE = 'FREE',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

export enum PlanDuration {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
}

export class UpdateSubscriptionDto {
  @ApiProperty({ enum: SubscriptionPlan })
  @IsEnum(SubscriptionPlan)
  subscriptionPlan: SubscriptionPlan;

  @ApiPropertyOptional({ enum: PlanDuration, default: PlanDuration.MONTHLY })
  @IsOptional()
  @IsEnum(PlanDuration)
  duration?: PlanDuration;
}
