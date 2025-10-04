import { CourseService } from '../services/courses.service';
import { GoalService } from 'src/modules/goals/application/services/goal.service';
export declare class DailyUpdateCronService {
    private readonly courseService;
    private readonly goalService;
    private readonly logger;
    constructor(courseService: CourseService, goalService: GoalService);
    handleDailyUpdate(): Promise<void>;
    private updateCoursesStatus;
    private updateGoalsStatus;
}
