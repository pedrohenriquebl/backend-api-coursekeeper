import { IEventHandler } from '@nestjs/cqrs';
import { GoalProgressUpdatedEvent } from 'src/modules/courses/application/events/goal-progress-updated.event';
import { GoalService } from '../services/goal.service';
export declare class GoalProgressUpdatedHandler implements IEventHandler<GoalProgressUpdatedEvent> {
    private readonly goalService;
    constructor(goalService: GoalService);
    handle(event: GoalProgressUpdatedEvent): Promise<void>;
}
