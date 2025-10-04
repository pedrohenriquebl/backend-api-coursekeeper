import { CourseService } from '../../application/services/courses.service';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { UpdateCourseDto } from '../dtos/update-course.dto';
import { FindCoursesQueryDto } from '../dtos/query-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    findAllByUser(userId: number, query: FindCoursesQueryDto): Promise<{
        courses: import("../../domain/entities/courses.entity").Courses[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllByUserNoPagination(userId: number): Promise<import("../../domain/entities/courses.entity").Courses[]>;
    findRecentByUser(userId: number): Promise<import("../../domain/entities/courses.entity").Courses[]>;
    findById(userId: number, courseId: number): Promise<import("../../domain/entities/courses.entity").Courses | null>;
    create(userId: number, dto: CreateCourseDto): Promise<import("../../domain/entities/courses.entity").Courses>;
    update(userId: number, dto: UpdateCourseDto): Promise<import("../../domain/entities/courses.entity").Courses | null>;
    delete(userId: number, courseId: number): Promise<void>;
}
