import { CourseStatus, Language, Platform, Topic } from '@prisma/client';
export declare class CreateCourseDto {
    name: string;
    description?: string | null;
    platform: Platform;
    platformCustom?: string | null;
    duration: number;
    studiedHours: number;
    topic: Topic;
    topicCustom?: string | null;
    language: Language;
    languageCustom?: string | null;
    rating: number;
    comment?: string | null;
    status?: CourseStatus;
    startDate: string;
    endDate?: string | null;
    instructor?: string | null;
}
