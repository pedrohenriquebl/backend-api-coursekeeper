import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import type { ICourseRepository } from '../../domain/repositories/courses.repository.interface';
import { Courses } from '../../domain/entities/courses.entity';
import { CreateCourseDto } from '../../presentation/dtos/create-course.dto';
import { UpdateCourseDto } from '../../presentation/dtos/update-course.dto';

export class CourseService {
  constructor(
    @Inject('ICourseRepository')
    private readonly courseRepository: ICourseRepository,
  ) {}

  async findById(userId: number, courseId: number): Promise<Courses | null> {
    const course = await this.courseRepository.findById(courseId);
    if (!course)
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    if (course.userId !== userId) throw new ForbiddenException('Access denied');
    return course;
  }

  async findRecentByUser(userId: number): Promise<Courses[]> {
  return this.courseRepository.findRecentByUser(userId, 3);
}

  async findAllByUser(userId: number): Promise<Courses[]> {
    const courses = await this.courseRepository.findAllByUser(userId);
    if (!courses || courses.length === 0)
      throw new NotFoundException('No courses found for this user');
    return courses;
  }

  async create(userId: number, dto: CreateCourseDto): Promise<Courses> {
    let progress = 0;
    if (dto.studiedHours && dto.duration > 0) {
      progress = (dto.studiedHours / dto.duration) * 100;
      if (progress > 100) progress = 100;
    }

    let status = dto.status ?? 'NAO_INICIADO';
    if (progress === 0) status = 'NAO_INICIADO';
    else if (progress > 0 && progress < 100) status = 'EM_PROGRESSO';
    else if (progress >= 100) status = 'CONCLUIDO';

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
    if (progress === 0) status = 'NAO_INICIADO';
    else if (progress > 0 && progress < 100) status = 'EM_PROGRESSO';
    else if (progress >= 100) status = 'CONCLUIDO';

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
}
