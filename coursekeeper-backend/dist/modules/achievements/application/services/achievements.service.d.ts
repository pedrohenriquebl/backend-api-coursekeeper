import type { IAchievementsRepository } from '../../domain/repositories/achievements.repository.interface';
import { GoalService } from 'src/modules/goals/application/services/goal.service';
import { UserService } from 'src/modules/user/application/services/user.service';
import { CourseService } from 'src/modules/courses/application/services/courses.service';
import { Achievement } from '../../domain/entities/achievement.entity';
export declare class AchievementsService {
    private readonly achievementsRepo;
    private readonly goalService;
    private readonly courseService;
    private readonly userService;
    constructor(achievementsRepo: IAchievementsRepository, goalService: GoalService, courseService: CourseService, userService: UserService);
    checkAndAssign(userId: number): Promise<void>;
    listUserAchievements(userId: number): Promise<{
        achievement: Achievement;
        unlocked: boolean;
    }[]>;
    listAllAchievements(): Promise<Achievement[]>;
}
