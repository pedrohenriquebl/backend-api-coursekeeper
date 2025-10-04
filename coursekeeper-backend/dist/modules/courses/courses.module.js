"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const auth_module_1 = require("../auth/auth.module");
const courses_service_1 = require("./application/services/courses.service");
const prisma_courses_repository_1 = require("./infra/prisma/prisma-courses.repository");
const cqrs_1 = require("@nestjs/cqrs");
const goal_service_1 = require("../goals/application/services/goal.service");
const goals_module_1 = require("../goals/goals.module");
const course_status_task_1 = require("./application/tasks/course-status.task");
const achievements_module_1 = require("../achievements/achievements.module");
let CourseModule = class CourseModule {
};
exports.CourseModule = CourseModule;
exports.CourseModule = CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            cqrs_1.CqrsModule,
            goals_module_1.GoalModule,
            achievements_module_1.AchievementsModule,
        ],
        providers: [
            courses_service_1.CourseService,
            prisma_service_1.PrismaService,
            goal_service_1.GoalService,
            course_status_task_1.DailyUpdateCronService,
            {
                provide: 'ICourseRepository',
                useClass: prisma_courses_repository_1.PrismaCourseRepository,
            },
        ],
        exports: [courses_service_1.CourseService, 'ICourseRepository'],
    })
], CourseModule);
//# sourceMappingURL=courses.module.js.map