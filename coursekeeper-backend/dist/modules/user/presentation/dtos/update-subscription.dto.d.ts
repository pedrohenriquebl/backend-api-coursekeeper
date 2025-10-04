import { PlanDuration } from '../../domain/enums/plan-duration.enum';
declare const SubscriptionPlanValues: readonly ["FREE", "GOLD", "PLATINUM"];
type SubscriptionPlanType = (typeof SubscriptionPlanValues)[number];
export declare class UpdateSubscriptionDto {
    subscriptionPlan: SubscriptionPlanType;
    duration?: PlanDuration;
}
export {};
