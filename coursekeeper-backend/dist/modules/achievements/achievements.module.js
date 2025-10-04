"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const prisma_achievements_repository_1 = require("./infra/prisma/prisma-achievements.repository");
const user_module_1 = require("../user/user.module");
const goals_module_1 = require("../goals/goals.module");
const courses_module_1 = require("../courses/courses.module");
const cqrs_1 = require("@nestjs/cqrs");
const achievements_service_1 = require("./application/services/achievements.service");
let AchievementsModule = class AchievementsModule {
};
exports.AchievementsModule = AchievementsModule;
exports.AchievementsModule = AchievementsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => goals_module_1.GoalModule),
            (0, common_1.forwardRef)(() => courses_module_1.CourseModule),
            cqrs_1.CqrsModule,
        ],
        providers: [
            achievements_service_1.AchievementsService,
            prisma_service_1.PrismaService,
            {
                provide: 'IAchievementsRepository',
                useClass: prisma_achievements_repository_1.PrismaAchievementsRepository,
            },
        ],
        exports: [achievements_service_1.AchievementsService, 'IAchievementsRepository'],
    })
], AchievementsModule);
//# sourceMappingURL=achievements.module.js.map