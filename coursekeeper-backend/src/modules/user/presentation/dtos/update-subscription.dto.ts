import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PlanDuration } from '../../domain/enums/plan-duration.enum';

const SubscriptionPlanValues = ['FREE', 'GOLD', 'PLATINUM'] as const;
type SubscriptionPlanType = (typeof SubscriptionPlanValues)[number];

export class UpdateSubscriptionDto {
  @ApiProperty({ enum: SubscriptionPlanValues })
  @IsEnum(SubscriptionPlanValues)
  subscriptionPlan: SubscriptionPlanType;

  @ApiPropertyOptional({ enum: PlanDuration, default: PlanDuration.MONTHLY })
  @IsOptional()
  @IsEnum(PlanDuration)
  duration?: PlanDuration;
}
