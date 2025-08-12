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

  async findAllByUser(userId: number): Promise<Courses[]> {
    const courses = await this.prisma.course.findMany({
      where: {
        userId,
        deletedAt: null,
      },
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
    const updatedCourse = await this.prisma.course.update({
      where: { id: course.id },
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
      },
    });

    if (!updatedCourse) return null;

    return new Courses({
      id: updatedCourse.id,
      name: updatedCourse.name,
      description: updatedCourse.description,
      createdAt: updatedCourse.createdAt,
      updatedAt: updatedCourse.updatedAt,
      deletedAt: updatedCourse.deletedAt,
      platform: updatedCourse.platform,
      platformCustom: updatedCourse.platformCustom,
      duration: updatedCourse.duration,
      studiedHours: updatedCourse.studiedHours,
      topic: updatedCourse.topic,
      topicCustom: updatedCourse.topicCustom,
      language: updatedCourse.language,
      languageCustom: updatedCourse.languageCustom,
      progress: updatedCourse.progress,
      rating: updatedCourse.rating,
      comment: updatedCourse.comment,
      status: updatedCourse.status,
      startDate: updatedCourse.startDate,
      endDate: updatedCourse.endDate,
      instructor: updatedCourse.instructor,
      userId: updatedCourse.userId,
    });
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
}
