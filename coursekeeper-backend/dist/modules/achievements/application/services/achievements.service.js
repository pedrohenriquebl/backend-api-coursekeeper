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
exports.AchievementsService = void 0;
const common_1 = require("@nestjs/common");
const goal_service_1 = require("../../../goals/application/services/goal.service");
const user_service_1 = require("../../../user/application/services/user.service");
const courses_service_1 = require("../../../courses/application/services/courses.service");
let AchievementsService = class AchievementsService {
    achievementsRepo;
    goalService;
    courseService;
    userService;
    constructor(achievementsRepo, goalService, courseService, userService) {
        this.achievementsRepo = achievementsRepo;
        this.goalService = goalService;
        this.courseService = courseService;
        this.userService = userService;
    }
    async checkAndAssign(userId) {
        const achievements = await this.achievementsRepo.findAll();
        const user = await this.userService.findById(String(userId));
        const courses = await this.courseService.findAllByUserSimple(userId);
        const goals = await this.goalService.getAll(userId);
        for (const achievement of achievements) {
            const has = await this.achievementsRepo.userHasAchievement(userId, achievement.id);
            if (has)
                continue;
            if (!achievement.condition) {
                continue;
            }
            let unlocked = false;
            let condition;
            try {
                condition = JSON.parse(achievement.condition);
            }
            catch {
                console.warn(`Invalid condition JSON for achievement ${achievement.code}`);
                continue;
            }
            switch (condition.type) {
                case 'COURSES_COMPLETED':
                    unlocked =
                        courses.filter((c) => c.status === 'CONCLUIDO' &&
                            (!condition.topic ||
                                c.topic?.toUpperCase() === condition.topic.toUpperCase())).length >= (condition.target ?? 0);
                    break;
                case 'TOTAL_HOURS':
                    unlocked =
                        courses.reduce((sum, c) => sum + (c.studiedHours ?? 0), 0) >=
                            (condition.target ?? 0);
                    break;
                case 'STREAK':
                    unlocked = (user?.currentLoginStreak ?? 0) >= (condition.target ?? 0);
                    break;
                case 'GOALS_COMPLETED':
                    unlocked =
                        goals.filter((g) => g.status === 'CONCLUIDA').length >=
                            (condition.target ?? 0);
                    break;
                case 'GOALS_COMPLETED_ALL':
                    unlocked =
                        goals.length > 0 && goals.every((g) => g.status === 'CONCLUIDA');
                    break;
                case 'HORAS_TOTAIS':
                    unlocked =
                        goals
                            .filter((g) => g.type === 'HORAS_TOTAIS')
                            .reduce((sum, g) => sum + (g.current ?? 0), 0) >=
                            (condition.target ?? 0);
                    break;
                case 'HORAS_TOPICO':
                    unlocked =
                        goals
                            .filter((g) => g.type === 'HORAS_TOPICO' &&
                            (!condition.topic ||
                                g.topic?.toUpperCase() === condition.topic.toUpperCase()))
                            .reduce((sum, g) => sum + (g.current ?? 0), 0) >=
                            (condition.target ?? 0);
                    break;
                case 'CURSOS_CONCLUIDOS':
                    unlocked =
                        goals
                            .filter((g) => g.type === 'CURSOS_CONCLUIDOS')
                            .reduce((sum, g) => sum + (g.current ?? 0), 0) >=
                            (condition.target ?? 0);
                    break;
                case 'PERIODO_ESTUDO': {
                    const streakAtStart = goals.find((g) => g.type === 'PERIODO_ESTUDO')?.streakAtStart ?? 0;
                    const currentStreak = user?.currentLoginStreak ?? 0;
                    unlocked = currentStreak - streakAtStart >= (condition.target ?? 0);
                    break;
                }
                default:
                    console.warn(`Unknown condition type: ${condition.type}`);
            }
            if (unlocked) {
                await this.achievementsRepo.assignToUser(userId, achievement.id);
            }
        }
    }
    async listUserAchievements(userId) {
        const allAchievements = await this.achievementsRepo.findAll();
        const result = [];
        for (const achievement of allAchievements) {
            const unlocked = await this.achievementsRepo.userHasAchievement(userId, achievement.id);
            if (unlocked) {
                result.push({ achievement, unlocked });
            }
        }
        return result;
    }
    async listAllAchievements() {
        return this.achievementsRepo.findAll();
    }
};
exports.AchievementsService = AchievementsService;
exports.AchievementsService = AchievementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IAchievementsRepository')),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [Object, goal_service_1.GoalService,
        courses_service_1.CourseService,
        user_service_1.UserService])
], AchievementsService);
//# sourceMappingURL=achievements.service.js.map