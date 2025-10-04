"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./application/services/user.service");
const prisma_user_repository_1 = require("./infra/prisma/prisma-user.repository");
const prisma_service_1 = require("../../prisma.service");
const auth_module_1 = require("../auth/auth.module");
const courses_module_1 = require("../courses/courses.module");
const goals_module_1 = require("../goals/goals.module");
const achievements_module_1 = require("../achievements/achievements.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => auth_module_1.AuthModule), courses_module_1.CourseModule, goals_module_1.GoalModule, achievements_module_1.AchievementsModule],
        providers: [
            user_service_1.UserService,
            prisma_service_1.PrismaService,
            {
                provide: 'IUserRepository',
                useClass: prisma_user_repository_1.PrismaUserRepository,
            },
        ],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map