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
var DailyUpdateCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyUpdateCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const courses_service_1 = require("../services/courses.service");
const goal_service_1 = require("../../../goals/application/services/goal.service");
let DailyUpdateCronService = DailyUpdateCronService_1 = class DailyUpdateCronService {
    courseService;
    goalService;
    logger = new common_1.Logger(DailyUpdateCronService_1.name);
    constructor(courseService, goalService) {
        this.courseService = courseService;
        this.goalService = goalService;
    }
    async handleDailyUpdate() {
        this.logger.log('Iniciando atualização diária de cursos e metas...');
        await this.updateCoursesStatus();
        await this.updateGoalsStatus();
        this.logger.log('Atualização diária concluída.');
    }
    async updateCoursesStatus() {
        const courses = await this.courseService.findAll();
        const now = new Date();
        for (const course of courses) {
            if (!course.endDate)
                continue;
            if (now > course.endDate &&
                course.status !== 'CONCLUIDO' &&
                course.status !== 'NAO_CONCLUIDO') {
                await this.courseService.systemUpdateCourse(course, {
                    status: 'NAO_CONCLUIDO',
                });
                this.logger.log(`Curso ${course.id} marcado como NAO_CONCLUIDO`);
            }
        }
    }
    async updateGoalsStatus() {
        const allUsers = await this.goalService.getAllUsers();
        for (const user of allUsers) {
            await this.goalService.updateGoalProgress(user.id, 0);
            this.logger.log(`Metas do usuário ${user.id} atualizadas.`);
        }
    }
};
exports.DailyUpdateCronService = DailyUpdateCronService;
__decorate([
    (0, schedule_1.Cron)('0 3 * * *', { timeZone: 'America/Sao_Paulo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DailyUpdateCronService.prototype, "handleDailyUpdate", null);
exports.DailyUpdateCronService = DailyUpdateCronService = DailyUpdateCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [courses_service_1.CourseService,
        goal_service_1.GoalService])
], DailyUpdateCronService);
//# sourceMappingURL=course-status.task.js.map