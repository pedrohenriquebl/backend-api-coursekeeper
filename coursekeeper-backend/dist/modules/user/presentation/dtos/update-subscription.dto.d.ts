import { SubscriptionPlan } from '@prisma/client';
import { PlanDuration } from '../../domain/enums/plan-duration.enum';
export declare class UpdateSubscriptionDto {
    subscriptionPlan: SubscriptionPlan;
    duration?: PlanDuration;
}
