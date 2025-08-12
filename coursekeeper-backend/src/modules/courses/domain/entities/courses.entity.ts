import { Platform, Topic, CourseStatus, Language } from '@prisma/client';

export class Courses {
  public id: number;
  public name: string;
  public description: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public platform: Platform;
  public platformCustom: string | null;
  public duration: number;
  public studiedHours: number;
  public topic: Topic;
  public topicCustom: string | null;
  public language: Language | null;
  public languageCustom: string | null;
  public progress: number;
  public rating: number;
  public comment: string | null;
  public status: CourseStatus;
  public startDate: Date;
  public endDate: Date | null;
  public instructor: string | null;
  public userId: number;

  constructor(data: {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    platform: Platform;
    platformCustom: string | null;
    duration: number;
    studiedHours: number;
    topic: Topic;
    topicCustom: string | null;
    language: Language | null;
    languageCustom: string | null;
    progress: number;
    rating: number;
    comment: string | null;
    status: CourseStatus;
    startDate: Date;
    endDate: Date | null;
    instructor: string | null;
    userId: number;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
    this.platform = data.platform;
    this.platformCustom = data.platformCustom;
    this.duration = data.duration;
    this.studiedHours = data.studiedHours;
    this.topic = data.topic;
    this.topicCustom = data.topicCustom;
    this.language = data.language;
    this.languageCustom = data.languageCustom;
    this.progress = data.progress;
    this.rating = data.rating;
    this.comment = data.comment;
    this.status = data.status;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.instructor = data.instructor;
    this.userId = data.userId;
  }
}
