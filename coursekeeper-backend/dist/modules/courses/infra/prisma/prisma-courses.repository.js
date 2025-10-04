"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCourseRepository = void 0;
const common_1 = require("@nestjs/common");
const courses_entity_1 = require("../../domain/entities/courses.entity");
const prisma_service_1 = require("../../../../prisma.service");
let PrismaCourseRepository = class PrismaCourseRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const course = await this.prisma.client.course.findUnique({
            where: { id },
        });
        if (!course)
            return null;
        return new courses_entity_1.Courses({
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
    async findAll() {
        const courses = await this.prisma.client.course.findMany({
            where: { deletedAt: null },
        });
        return courses.map((course) => new courses_entity_1.Courses({
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
        }));
    }
    async findAllByUser(userId, includeDeleted = false) {
        const whereClause = { userId };
        if (!includeDeleted)
            whereClause.deletedAt = null;
        const courses = await this.prisma.client.course.findMany({
            where: whereClause,
            orderBy: { createdAt: 'asc' },
        });
        return courses.map((c) => new courses_entity_1.Courses({ ...c }));
    }
    async create(course) {
        const createdCourse = await this.prisma.client.course.create({
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
        return new courses_entity_1.Courses({
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
    async update(course) {
        const updated = await this.prisma.client.course.update({
            where: { id: course.id },
            data: { ...course },
        });
        return new courses_entity_1.Courses({ ...updated });
    }
    async delete(id) {
        await this.prisma.client.course.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async findRecentByUser(userId, limit) {
        return this.prisma.client.course.findMany({
            where: { userId, deletedAt: null },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }
    async findAllByUserPaginated(userId, offset, limit, query, topic, platform, status) {
        const whereClause = { userId, deletedAt: null };
        if (query) {
            whereClause.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ];
        }
        if (topic)
            whereClause.topic = topic;
        if (platform)
            whereClause.platform = platform;
        if (status)
            whereClause.status = status;
        const total = await this.prisma.client.course.count({ where: whereClause });
        const courses = await this.prisma.client.course.findMany({
            where: whereClause,
            orderBy: { createdAt: 'asc' },
            skip: offset,
            take: limit,
        });
        const mappedCourses = courses.map((c) => new courses_entity_1.Courses({ ...c }));
        return [mappedCourses, total];
    }
    async findAllByUserSimple(userId) {
        const courses = await this.prisma.client.course.findMany({
            where: { userId, deletedAt: null },
            orderBy: { createdAt: 'asc' },
        });
        return courses.map((c) => new courses_entity_1.Courses({ ...c }));
    }
};
exports.PrismaCourseRepository = PrismaCourseRepository;
exports.PrismaCourseRepository = PrismaCourseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCourseRepository);
//# sourceMappingURL=prisma-courses.repository.js.map