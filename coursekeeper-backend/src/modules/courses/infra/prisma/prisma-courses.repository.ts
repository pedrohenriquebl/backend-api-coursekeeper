import { Injectable } from '@nestjs/common';
import { ICourseRepository } from '../../domain/repositories/courses.repository.interface';
import { Courses } from '../../domain/entities/courses.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PrismaCourseRepository implements ICourseRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: number): Promise<Courses | null> {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) return null;

    return new Courses({
      id: course.id,
      name: course.name,
      description: course.description,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      deletedAt: course.deletedAt,
      platform: course.platform,
      platformCustom: course.platformCustom,
      duration: course.duration,
      studiedHours: course.studiedHours,
      topic: course.topic,
      topicCustom: course.topicCustom,
      language: course.language,
      languageCustom: course.languageCustom,
      progress: course.progress,
      rating: course.rating,
      comment: course.comment,
      status: course.status,
      startDate: course.startDate,
      endDate: course.endDate,
      instructor: course.instructor,
      userId: course.userId,
    });
  }

  async findAll(): Promise<Courses[]> {
    const courses = await this.prisma.course.findMany({
      where: { deletedAt: null },
    });

    return courses.map(
      (course) =>
        new Courses({
          id: course.id,
          name: course.name,
          description: course.description,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
          deletedAt: course.deletedAt,
          platform: course.platform,
          platformCustom: course.platformCustom,
          duration: course.duration,
          studiedHours: course.studiedHours,
          topic: course.topic,
          topicCustom: course.topicCustom,
          language: course.language,
          languageCustom: course.languageCustom,
          progress: course.progress,
          rating: course.rating,
          comment: course.comment,
          status: course.status,
          startDate: course.startDate,
          endDate: course.endDate,
          instructor: course.instructor,
          userId: course.userId,
        }),
    );
  }

  async findAllByUser(
    userId: number,
    includeDeleted = false,
  ): Promise<Courses[]> {
    const whereClause: any = { userId };
    if (!includeDeleted) whereClause.deletedAt = null;

    const courses = await this.prisma.course.findMany({
      where: whereClause,
      orderBy: { createdAt: 'asc' },
    });
    return courses.map((c) => new Courses({ ...c }));
  }

  async create(course: Courses): Promise<Courses> {
    const createdCourse = await this.prisma.course.create({
      data: {
        name: course.name,
        description: course.description,
        platform: course.platform,
        platformCustom: course.platformCustom,
        duration: course.duration,
        studiedHours: course.studiedHours,
        topic: course.topic,
        topicCustom: course.topicCustom,
        language: course.language,
        languageCustom: course.languageCustom,
        progress: course.progress,
        rating: course.rating,
        comment: course.comment,
        status: course.status,
        startDate: course.startDate,
        endDate: course.endDate,
        instructor: course.instructor,
        user: { connect: { id: course.userId } },
      },
    });

    return new Courses({
      id: createdCourse.id,
      name: createdCourse.name,
      description: createdCourse.description,
      createdAt: createdCourse.createdAt,
      updatedAt: createdCourse.updatedAt,
      deletedAt: createdCourse.deletedAt,
      platform: createdCourse.platform,
      platformCustom: createdCourse.platformCustom,
      duration: createdCourse.duration,
      studiedHours: createdCourse.studiedHours,
      topic: createdCourse.topic,
      topicCustom: createdCourse.topicCustom,
      language: createdCourse.language,
      languageCustom: createdCourse.languageCustom,
      progress: createdCourse.progress,
      rating: createdCourse.rating,
      comment: createdCourse.comment,
      status: createdCourse.status,
      startDate: createdCourse.startDate,
      endDate: createdCourse.endDate,
      instructor: createdCourse.instructor,
      userId: createdCourse.userId,
    });
  }

  async update(course: Courses): Promise<Courses | null> {
    const updated = await this.prisma.course.update({
      where: { id: course.id },
      data: { ...course },
    });
    return new Courses({ ...updated });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.course.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findRecentByUser(userId: number, limit: number): Promise<Courses[]> {
    return this.prisma.course.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async findAllByUserPaginated(
    userId: number,
    offset: number,
    limit: number,
  ): Promise<[Courses[], number]> {
    const [courses, total] = await this.prisma.$transaction([
      this.prisma.course.findMany({
        where: { userId, deletedAt: null },
        orderBy: { createdAt: 'asc' },
        skip: offset,
        take: limit,
      }),
      this.prisma.course.count({
        where: { userId, deletedAt: null },
      }),
    ]);

    return [courses, total];
  }

  async findAllByUserSimple(userId: number): Promise<Courses[]> {
    const courses = await this.prisma.course.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });

    return courses.map((c) => new Courses({ ...c }));
  }
}
