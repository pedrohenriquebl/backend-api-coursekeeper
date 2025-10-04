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
exports.CourseController = void 0;
const swagger_1 = require("@nestjs/swagger");
const courses_service_1 = require("../../application/services/courses.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const create_course_dto_1 = require("../dtos/create-course.dto");
const update_course_dto_1 = require("../dtos/update-course.dto");
const query_course_dto_1 = require("../dtos/query-course.dto");
let CourseController = class CourseController {
    courseService;
    constructor(courseService) {
        this.courseService = courseService;
    }
    async findAllByUser(userId, query) {
        const { page, limit, query: q, topic, platform, status } = query;
        return this.courseService.findAllByUser(userId, {
            page,
            limit,
            query: q,
            topic: topic === 'all' ? undefined : topic,
            platform: platform === 'all' ? undefined : platform,
            status: status === 'all' ? undefined : status,
        });
    }
    async findAllByUserNoPagination(userId) {
        return this.courseService.findAllByUserSimple(userId);
    }
    async findRecentByUser(userId) {
        return this.courseService.findRecentByUser(userId);
    }
    async findById(userId, courseId) {
        return this.courseService.findById(userId, courseId);
    }
    async create(userId, dto) {
        return this.courseService.create(userId, dto);
    }
    async update(userId, dto) {
        return this.courseService.update(userId, dto.id, dto);
    }
    async delete(userId, courseId) {
        await this.courseService.delete(+userId, +courseId);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'query', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'topic', required: false, type: String, example: 'all' }),
    (0, swagger_1.ApiQuery)({ name: 'platform', required: false, type: String, example: 'all' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, type: String, example: 'all' }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, query_course_dto_1.FindCoursesQueryDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAllByUserNoPagination", null);
__decorate([
    (0, common_1.Get)('recent'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findRecentByUser", null);
__decorate([
    (0, common_1.Get)(':courseId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':courseId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "delete", null);
exports.CourseController = CourseController = __decorate([
    (0, swagger_1.ApiTags)('courses'),
    (0, common_1.Controller)('courses/:userId'),
    (0, swagger_1.ApiBearerAuth)('jwt-auth'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [courses_service_1.CourseService])
], CourseController);
//# sourceMappingURL=courses.controller.js.map