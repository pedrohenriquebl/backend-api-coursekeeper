import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SubscriptionPlan } from '@prisma/client';
import { PlanDuration } from '../../domain/enums/plan-duration.enum';

export class UpdateSubscriptionDto {
  @ApiProperty({ enum: SubscriptionPlan })
  @IsEnum(SubscriptionPlan)
  subscriptionPlan: SubscriptionPlan;

  @ApiPropertyOptional({ enum: PlanDuration, default: PlanDuration.MONTHLY })
  @IsOptional()
  @IsEnum(PlanDuration)
  duration?: PlanDuration;
}
