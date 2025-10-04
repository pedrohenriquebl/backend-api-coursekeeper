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
var GoalCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const goal_service_1 = require("../services/goal.service");
let GoalCronService = GoalCronService_1 = class GoalCronService {
    goalService;
    logger = new common_1.Logger(GoalCronService_1.name);
    constructor(goalService) {
        this.goalService = goalService;
    }
    async handleDailyGoalUpdate() {
        this.logger.log('Iniciando atualização diária de metas...');
        const allUsers = await this.goalService.getAllUsers();
        for (const user of allUsers) {
            await this.goalService.updateGoalProgress(user.id, 0);
            this.logger.log(`Metas do usuário ${user.id} atualizadas.`);
        }
        this.logger.log('Atualização diária de metas concluída.');
    }
};
exports.GoalCronService = GoalCronService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *', { timeZone: 'America/Sao_Paulo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoalCronService.prototype, "handleDailyGoalUpdate", null);
exports.GoalCronService = GoalCronService = GoalCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [goal_service_1.GoalService])
], GoalCronService);
//# sourceMappingURL=goals-status.task.js.map