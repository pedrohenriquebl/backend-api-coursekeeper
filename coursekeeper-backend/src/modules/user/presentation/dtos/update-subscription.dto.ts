import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SubscriptionPlan } from '@prisma/client';
import { PlanDuration } from '../../domain/enums/plan-duration.enum';

function safeEnum<T>(enumObj: T): T {
  if (!enumObj) throw new Error('Enum is undefined');
  return enumObj;
}

export class UpdateSubscriptionDto {
  @ApiProperty({ enum: safeEnum(SubscriptionPlan) })
  @IsEnum(safeEnum(SubscriptionPlan))
  subscriptionPlan: SubscriptionPlan;

  @ApiPropertyOptional({
    enum: safeEnum(PlanDuration),
    default: PlanDuration.MONTHLY,
  })
  @IsOptional()
  @IsEnum(safeEnum(PlanDuration))
  duration?: PlanDuration;
}
