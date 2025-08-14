export class GoalProgressUpdatedEvent {
  constructor(
    public readonly userId: number,
    public readonly studiedHoursDiff: number,
    public readonly topic?: string,
    public readonly courseStatus?: string,
  ) {}
}