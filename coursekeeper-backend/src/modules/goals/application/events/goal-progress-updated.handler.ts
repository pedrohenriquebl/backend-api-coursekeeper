import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GoalProgressUpdatedEvent } from 'src/modules/courses/application/events/goal-progress-updated.event';
import { GoalService } from '../services/goal.service';

@EventsHandler(GoalProgressUpdatedEvent)
export class GoalProgressUpdatedHandler implements IEventHandler<GoalProgressUpdatedEvent> {
  constructor(private readonly goalService: GoalService) {}

  async handle(event: GoalProgressUpdatedEvent) {
    await this.goalService.updateGoalProgress(
      event.userId,
      event.studiedHoursDiff,
      event.topic,
      event.courseStatus,
    );
  }
}
