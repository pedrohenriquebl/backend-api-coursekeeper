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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const courses_entity_1 = require("../../domain/entities/courses.entity");
const goal_service_1 = require("../../../goals/application/services/goal.service");
const achievements_service_1 = require("../../../achievements/application/services/achievements.service");
let CourseService = class CourseService {
    courseRepository;
    goalService;
    achievementsService;
    constructor(courseRepository, goalService, achievementsService) {
        this.courseRepository = courseRepository;
        this.goalService = goalService;
        this.achievementsService = achievementsService;
    }
    async findById(userId, courseId) {
        const course = await this.courseRepository.findById(courseId);
        if (!course)
            throw new common_1.NotFoundException(`Course with ID ${courseId} not foun d`);
        if (course.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return course;
    }
    async findRecentByUser(userId) {
        return this.courseRepository.findRecentByUser(userId, 3);
    }
    async findAllByUserSimple(userId) {
        return (await this.courseRepository.findAllByUser(userId)) ?? [];
    }
    async findAllByUser(userId, options) {
        const page = options?.page && options.page > 0 ? options.page : 1;
        const limit = options?.limit && options.limit > 0 ? options.limit : 10;
        const offset = (page - 1) * limit;
        const [courses, total] = await this.courseRepository.findAllByUserPaginated(userId, offset, limit, options?.query, options?.topic, options?.platform, options?.status);
        return {
            courses,
            total,
            page,
            limit,
        };
    }
    async findAll() {
        return this.courseRepository.findAll();
    }
    async create(userId, dto) {
        let progress = 0;
        if (dto.studiedHours && dto.duration > 0) {
            progress = (dto.studiedHours / dto.duration) * 100;
            if (progress > 100)
                progress = 100;
        }
        let status = dto.status ?? 'NAO_INICIADO';
        if (progress === null)
            status = 'NAO_INICIADO';
        else if (progress >= 0 && progress < 100)
            status = 'EM_PROGRESSO';
        else if (progress >= 100)
            status = 'CONCLUIDO';
        if (dto.endDate) {
            const endDate = new Date(dto.endDate);
            if (new Date() > endDate) {
                status = 'NAO_CONCLUIDO';
            }
        }
        const course = new courses_entity_1.Courses({
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
    async update(userId, courseId, dto) {
        const course = await this.courseRepository.findById(courseId);
        if (!course)
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        if (course.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
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
            if (progress > 100)
                progress = 100;
        }
        let status = dto.status ?? course.status;
        if (progress === null)
            status = 'NAO_INICIADO';
        else if (progress >= 0 && progress < 100)
            status = 'EM_PROGRESSO';
        else if (progress >= 100)
            status = 'CONCLUIDO';
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
        }
        else if (dto.studiedHours !== undefined &&
            dto.studiedHours !== course.studiedHours) {
            studiedHoursDiff = (dto.studiedHours ?? 0) - (course.studiedHours ?? 0);
        }
        if (studiedHoursDiff > 0) {
            await this.goalService.updateGoalProgress(course.userId, studiedHoursDiff, course.topic, status);
            await this.achievementsService.checkAndAssign(course.userId);
        }
        return updatedCourse;
    }
    async delete(userId, courseId) {
        const existingCourse = await this.courseRepository.findById(courseId);
        if (!existingCourse)
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        if (existingCourse.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        await this.courseRepository.delete(courseId);
    }
    async systemUpdateCourse(course, partial) {
        const updatedCourse = await this.courseRepository.update({
            ...course,
            ...partial,
            updatedAt: new Date(),
        });
        return updatedCourse;
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    __param(0, (0, common_1.Inject)('ICourseRepository')),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => achievements_service_1.AchievementsService))),
    __metadata("design:paramtypes", [Object, goal_service_1.GoalService,
        achievements_service_1.AchievementsService])
], CourseService);
//# sourceMappingURL=courses.service.js.map