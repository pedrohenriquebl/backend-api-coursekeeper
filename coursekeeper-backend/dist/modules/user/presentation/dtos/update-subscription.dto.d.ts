export declare enum SubscriptionPlan {
    FREE = "FREE",
    GOLD = "GOLD",
    PLATINUM = "PLATINUM"
}
export declare enum PlanDuration {
    MONTHLY = "MONTHLY",
    ANNUAL = "ANNUAL"
}
export declare class UpdateSubscriptionDto {
    subscriptionPlan: SubscriptionPlan;
    duration?: PlanDuration;
}
