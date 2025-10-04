import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PlanDuration } from '../../domain/enums/plan-duration.enum';

export enum SubscriptionPlanEnum {
  FREE = 'FREE',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

export class UpgradePlanDto {
  @ApiProperty({ enum: SubscriptionPlanEnum })
  @IsEnum(SubscriptionPlanEnum)
  subscriptionPlan: SubscriptionPlanEnum;

  @ApiProperty({ enum: PlanDuration })
  @IsEnum(PlanDuration, { message: 'Tipo deve ser monthly ou annual' })
  type: PlanDuration;
}
