import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SubscriptionPlan } from '@prisma/client';
import { PlanDuration } from '../../domain/enums/plan-duration.enum';

export class UpgradePlanDto {
  @ApiProperty({ enum: SubscriptionPlan })
  @IsEnum(SubscriptionPlan)
  subscriptionPlan: SubscriptionPlan;

  @ApiProperty({ enum: PlanDuration })
  @IsEnum(PlanDuration, { message: 'Tipo deve ser monthly ou annual' })
  type: PlanDuration;
}
