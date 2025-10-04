"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_controller_1 = require("./modules/user/presentation/controllers/user.controller");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const courses_module_1 = require("./modules/courses/courses.module");
const courses_controller_1 = require("./modules/courses/presentation/controllers/courses.controller");
const goals_module_1 = require("./modules/goals/goals.module");
const goals_controller_1 = require("./modules/goals/presentation/controllers/goals.controller");
const schedule_1 = require("@nestjs/schedule");
const course_status_task_1 = require("./modules/courses/application/tasks/course-status.task");
const achievements_module_1 = require("./modules/achievements/achievements.module");
const achievements_controller_1 = require("./modules/achievements/presentation/controllers/achievements.controller");
const ai_assistant_module_1 = require("./modules/ai-assistant/ai-assistant.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            courses_module_1.CourseModule,
            goals_module_1.GoalModule,
            achievements_module_1.AchievementsModule,
            ai_assistant_module_1.AiAssistantModule,
            schedule_1.ScheduleModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'public'),
                serveRoot: '/public',
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            user_controller_1.UserController,
            courses_controller_1.CourseController,
            goals_controller_1.GoalsController,
            achievements_controller_1.AchievementsController,
        ],
        providers: [app_service_1.AppService, core_1.Reflector, course_status_task_1.DailyUpdateCronService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map