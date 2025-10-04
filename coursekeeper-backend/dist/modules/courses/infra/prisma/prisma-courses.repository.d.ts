import { ICourseRepository } from '../../domain/repositories/courses.repository.interface';
import { Courses } from '../../domain/entities/courses.entity';
import { PrismaService } from 'src/prisma.service';
export declare class PrismaCourseRepository implements ICourseRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<Courses | null>;
    findAll(): Promise<Courses[]>;
    findAllByUser(userId: number, includeDeleted?: boolean): Promise<Courses[]>;
    create(course: Courses): Promise<Courses>;
    update(course: Courses): Promise<Courses | null>;
    delete(id: number): Promise<void>;
    findRecentByUser(userId: number, limit: number): Promise<Courses[]>;
    findAllByUserPaginated(userId: number, offset: number, limit: number, query?: string, topic?: string, platform?: string, status?: string): Promise<[Courses[], number]>;
    findAllByUserSimple(userId: number): Promise<Courses[]>;
}
