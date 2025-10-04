export declare class GoalProgressUpdatedEvent {
    readonly userId: number;
    readonly studiedHoursDiff: number;
    readonly topic?: string | undefined;
    readonly courseStatus?: string | undefined;
    constructor(userId: number, studiedHoursDiff: number, topic?: string | undefined, courseStatus?: string | undefined);
}
