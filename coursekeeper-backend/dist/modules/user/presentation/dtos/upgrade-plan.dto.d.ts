import { PlanDuration } from '../../domain/enums/plan-duration.enum';
export declare enum SubscriptionPlanEnum {
    FREE = "FREE",
    GOLD = "GOLD",
    PLATINUM = "PLATINUM"
}
export declare class UpgradePlanDto {
    subscriptionPlan: SubscriptionPlanEnum;
    type: PlanDuration;
}
