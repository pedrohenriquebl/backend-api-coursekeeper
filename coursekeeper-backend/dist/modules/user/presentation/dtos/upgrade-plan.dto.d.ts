import { SubscriptionPlan } from '@prisma/client';
import { PlanDuration } from '../../domain/enums/plan-duration.enum';
export declare class UpgradePlanDto {
    subscriptionPlan: SubscriptionPlan;
    type: PlanDuration;
}
