import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

const SubscriptionPlanValues = ['FREE', 'GOLD', 'PLATINUM'] as const;
type SubscriptionPlanType = (typeof SubscriptionPlanValues)[number];

// PlanDuration
const PlanDurationValues = ['MONTHLY', 'ANNUAL'] as const;
type PlanDurationType = (typeof PlanDurationValues)[number];

export class UpdateSubscriptionDto {
  @ApiProperty({ enum: SubscriptionPlanValues })
  @IsEnum(SubscriptionPlanValues)
  subscriptionPlan: SubscriptionPlanType;

  @ApiPropertyOptional({ enum: PlanDurationValues, default: 'MONTHLY' })
  @IsOptional()
  @IsEnum(PlanDurationValues)
  duration?: PlanDurationType;
}
