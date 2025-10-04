"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const auth_module_1 = require("../auth/auth.module");
const goal_service_1 = require("./application/services/goal.service");
const prisma_goals_repository_1 = require("./infra/prisma/prisma-goals.repository");
const goal_progress_updated_handler_1 = require("./application/events/goal-progress-updated.handler");
const cqrs_1 = require("@nestjs/cqrs");
const user_module_1 = require("../user/user.module");
const prisma_user_repository_1 = require("../user/infra/prisma/prisma-user.repository");
let GoalModule = class GoalModule {
};
exports.GoalModule = GoalModule;
exports.GoalModule = GoalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            cqrs_1.CqrsModule,
        ],
        providers: [
            goal_service_1.GoalService,
            prisma_service_1.PrismaService,
            goal_progress_updated_handler_1.GoalProgressUpdatedHandler,
            {
                provide: 'IGoalsRepository',
                useClass: prisma_goals_repository_1.PrismaGoalsRepository,
            },
            {
                provide: 'IUserRepository',
                useClass: prisma_user_repository_1.PrismaUserRepository,
            },
        ],
        exports: [goal_service_1.GoalService, 'IGoalsRepository', 'IUserRepository'],
    })
], GoalModule);
//# sourceMappingURL=goals.module.js.map