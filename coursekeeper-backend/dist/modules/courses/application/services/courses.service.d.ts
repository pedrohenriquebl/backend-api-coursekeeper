import type { ICourseRepository } from '../../domain/repositories/courses.repository.interface';
import { Courses } from '../../domain/entities/courses.entity';
import { CreateCourseDto } from '../../presentation/dtos/create-course.dto';
import { UpdateCourseDto } from '../../presentation/dtos/update-course.dto';
import { GoalService } from 'src/modules/goals/application/services/goal.service';
import { AchievementsService } from 'src/modules/achievements/application/services/achievements.service';
export declare class CourseService {
    private readonly courseRepository;
    private readonly goalService;
    private readonly achievementsService;
    constructor(courseRepository: ICourseRepository, goalService: GoalService, achievementsService: AchievementsService);
    findById(userId: number, courseId: number): Promise<Courses | null>;
    findRecentByUser(userId: number): Promise<Courses[]>;
    findAllByUserSimple(userId: number): Promise<Courses[]>;
    findAllByUser(userId: number, options?: {
        page?: number;
        limit?: number;
        query?: string;
        topic?: string;
        platform?: string;
        status?: string;
    }): Promise<{
        courses: Courses[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAll(): Promise<Courses[]>;
    create(userId: number, dto: CreateCourseDto): Promise<Courses>;
    update(userId: number, courseId: number, dto: UpdateCourseDto): Promise<Courses | null>;
    delete(userId: number, courseId: number): Promise<void>;
    systemUpdateCourse(course: Courses, partial: Partial<Courses>): Promise<Courses | null>;
}
