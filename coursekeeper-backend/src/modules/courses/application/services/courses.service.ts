import {
  ForbiddenException,
  forwardRef,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import type { ICourseRepository } from '../../domain/repositories/courses.repository.interface';
import { Courses } from '../../domain/entities/courses.entity';
import { CreateCourseDto } from '../../presentation/dtos/create-course.dto';
import { UpdateCourseDto } from '../../presentation/dtos/update-course.dto';
import { GoalService } from 'src/modules/goals/application/services/goal.service';
import { AchievementsService } from 'src/modules/achievements/application/services/achievements.service';

export class CourseService {
  constructor(
    @Inject('ICourseRepository')
    private readonly courseRepository: ICourseRepository,
    private readonly goalService: GoalService,
    @Inject(forwardRef(() => AchievementsService))
    private readonly achievementsService: AchievementsService,
  ) {}

  async findById(userId: number, courseId: number): Promise<Courses | null> {
    const course = await this.courseRepository.findById(courseId);
    if (!course)
      throw new NotFoundException(`Course with ID ${courseId} not foun d`);
    if (course.userId !== userId) throw new ForbiddenException('Access denied');
    return course;
  }

  async findRecentByUser(userId: number): Promise<Courses[]> {
    return this.courseRepository.findRecentByUser(userId, 3);
  }

  async findAllByUserSimple(userId: number): Promise<Courses[]> {
    return (await this.courseRepository.findAllByUserSimple(userId)) ?? [];
  }

  async findAllByUser(
    userId: number,
    options?: { page?: number; limit?: number },
  ): Promise<{
    courses: Courses[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = options?.page && options.page > 0 ? options.page : 1;
    const limit = options?.limit && options.limit > 0 ? options.limit : 10;
    const offset = (page - 1) * limit;

    const [courses, total] = await this.courseRepository.findAllByUserPaginated(
      userId,
      offset,
      limit,
    );

    return {
      courses,
      total,
      page,
      limit,
    };
  }

  async findAll(): Promise<Courses[]> {
    return this.courseRepository.findAll();
  }

  async create(userId: number, dto: CreateCourseDto): Promise<Courses> {
    let progress = 0;
    if (dto.studiedHours && dto.duration > 0) {
      progress = (dto.studiedHours / dto.duration) * 100;
      if (progress > 100) progress = 100;
    }

    let status = dto.status ?? 'NAO_INICIADO';
    if (progress === null) status = 'NAO_INICIADO';
    else if (progress >= 0 && progress < 100) status = 'EM_PROGRESSO';
    else if (progress >= 100) status = 'CONCLUIDO';

    if (dto.endDate) {
      const endDate = new Date(dto.endDate);
      if (new Date() > endDate) {
        status = 'NAO_CONCLUIDO';
      }
    }

    const course = new Courses({
      id: 0,
      name: dto.name,
      description: dto.description ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      platform: dto.platform,
      platformCustom: dto.platformCustom ?? null,
      duration: dto.duration,
      studiedHours: dto.studiedHours,
      topic: dto.topic,
      topicCustom: dto.topicCustom ?? null,
      language: dto.language,
      languageCustom: dto.languageCustom ?? null,
      progress,
      rating: dto.rating ?? 0,
      comment: dto.comment ?? null,
      status,
      startDate: new Date(dto.startDate),
      endDate: dto.endDate ? new Date(dto.endDate) : null,
      instructor: dto.instructor ?? null,
      userId,
    });

    const createdCourse = await this.courseRepository.create(course);
    return createdCourse;
  }

  async update(
    userId: number,
    courseId: number,
    dto: UpdateCourseDto,
  ): Promise<Courses | null> {
    const course = await this.courseRepository.findById(courseId);
    if (!course)
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    if (course.userId !== userId) throw new ForbiddenException('Access denied');

    const startDate = dto.startDate
      ? new Date(dto.startDate)
      : course.startDate;
    const endDate = dto.endDate
      ? new Date(dto.endDate)
      : new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    let progress = course.progress;
    const duration = dto.duration ?? course.duration;
    const studiedHours = dto.studiedHours ?? course.studiedHours;

    if (duration > 0) {
      progress = (studiedHours / duration) * 100;
      if (progress > 100) progress = 100;
    }

    let status = dto.status ?? course.status;
    if (progress === null) status = 'NAO_INICIADO';
    else if (progress >= 0 && progress < 100) status = 'EM_PROGRESSO';
    else if (progress >= 100) status = 'CONCLUIDO';

    if (status !== 'CONCLUIDO' && endDate && new Date() > endDate) {
      status = 'NAO_CONCLUIDO';
    }

    const dataToUpdate = {
      ...dto,
      startDate,
      endDate,
      progress,
      status,
    };

    const updatedCourse = await this.courseRepository.update({
      ...course,
      ...dataToUpdate,
    });

    let studiedHoursDiff = 0;

    if (dto.status === 'CONCLUIDO' && course.status !== 'CONCLUIDO') {
      studiedHoursDiff = course.duration - course.studiedHours;
    } else if (
      dto.studiedHours !== undefined &&
      dto.studiedHours !== course.studiedHours
    ) {
      studiedHoursDiff = (dto.studiedHours ?? 0) - (course.studiedHours ?? 0);
    }

    if (studiedHoursDiff > 0) {
      await this.goalService.updateGoalProgress(
        course.userId,
        studiedHoursDiff,
        course.topic,
        status,
      );

      await this.achievementsService.checkAndAssign(course.userId);
    }

    return updatedCourse;
  }

  async delete(userId: number, courseId: number): Promise<void> {
    const existingCourse = await this.courseRepository.findById(courseId);
    if (!existingCourse)
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    if (existingCourse.userId !== userId)
      throw new ForbiddenException('Access denied');

    await this.courseRepository.delete(courseId);
  }

  async systemUpdateCourse(
    course: Courses,
    partial: Partial<Courses>,
  ): Promise<Courses | null> {
    const updatedCourse = await this.courseRepository.update({
      ...course,
      ...partial,
      updatedAt: new Date(),
    });

    return updatedCourse;
  }
}
