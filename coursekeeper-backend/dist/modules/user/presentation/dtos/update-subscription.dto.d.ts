declare const SubscriptionPlanValues: readonly ["FREE", "GOLD", "PLATINUM"];
type SubscriptionPlanType = (typeof SubscriptionPlanValues)[number];
declare const PlanDurationValues: readonly ["MONTHLY", "ANNUAL"];
type PlanDurationType = (typeof PlanDurationValues)[number];
export declare class UpdateSubscriptionDto {
    subscriptionPlan: SubscriptionPlanType;
    duration?: PlanDurationType;
}
export {};
