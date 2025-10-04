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
exports.GoalService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let GoalService = class GoalService {
    goalsRepository;
    userRepository;
    constructor(goalsRepository, userRepository) {
        this.goalsRepository = goalsRepository;
        this.userRepository = userRepository;
    }
    async create(userId, dto) {
        const user = await this.userRepository.findById(String(userId));
        if (!user) {
            throw new common_1.NotFoundException(`Usuário ${userId} não encontrado`);
        }
        const activeGoals = await this.goalsRepository.findAllByUser(userId);
        const activeCount = activeGoals.filter((goal) => goal.isActive).length;
        const maxActiveGoals = this.getActiveGoalsLimit(user.subscriptionPlan);
        if (activeCount >= maxActiveGoals) {
            throw new common_1.HttpException(`Plano ${user.subscriptionPlan} permite no máximo ${maxActiveGoals} metas ativas`, common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.goalsRepository.create({
                ...dto,
                userId,
                current: 0,
                isActive: true,
                deadline: new Date(dto.deadline),
                status: client_1.GoalStatus.ATIVA,
                topic: dto.topic ?? null,
                streakAtStart: dto.type === client_1.GoalType.PERIODO_ESTUDO
                    ? Math.max(0, user?.currentLoginStreak ?? 0)
                    : null,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        catch (error) {
            throw error;
        }
    }
    getActiveGoalsLimit(subscriptionPlan) {
        switch (subscriptionPlan) {
            case 'FREE':
                return 2;
            case 'GOLD':
                return 10;
            case 'PLATINUM':
            case 'PREMIUM':
                return Infinity;
            default:
                return 2;
        }
    }
    async getAll(userId) {
        const goals = await this.goalsRepository.findAllByUser(userId);
        return goals ?? [];
    }
    async getById(id, userId) {
        const goal = await this.goalsRepository.findById(id);
        if (!goal || goal.userId !== userId) {
            throw new common_1.NotFoundException('Meta não encontrada');
        }
        return goal;
    }
    async update(id, userId, data) {
        const goal = await this.getById(id, userId);
        return this.goalsRepository.update(goal.id, data);
    }
    async delete(id, userId) {
        const goal = await this.getById(id, userId);
        await this.goalsRepository.delete(goal.id);
    }
    async updateGoalProgress(userId, studiedHoursDiff, topic, courseStatus) {
        const activeGoals = await this.goalsRepository.findAllByUser(userId);
        const filteredGoals = activeGoals.filter((goal) => goal.isActive);
        const today = new Date();
        for (const goal of filteredGoals) {
            let newCurrent = goal.current ?? 0;
            let newStatus = goal.status;
            let isActive = goal.isActive;
            if (goal.deadline &&
                goal.deadline < today &&
                goal.status !== client_1.GoalStatus.CONCLUIDA) {
                await this.goalsRepository.update(goal.id, {
                    status: client_1.GoalStatus.VENCIDA,
                    isActive: false,
                    updatedAt: new Date(),
                });
                continue;
            }
            switch (goal.type) {
                case 'HORAS_TOTAIS':
                    newCurrent += studiedHoursDiff;
                    if (newCurrent >= goal.target) {
                        newCurrent = goal.target;
                        newStatus = client_1.GoalStatus.CONCLUIDA;
                        isActive = false;
                    }
                    break;
                case 'HORAS_TOPICO':
                    const goalTopic = goal.topic?.toUpperCase().trim();
                    const courseTopic = topic?.toUpperCase().trim();
                    if (goalTopic === courseTopic) {
                        newCurrent = Math.max(0, (goal.current ?? 0) + studiedHoursDiff);
                        if (newCurrent >= goal.target) {
                            newCurrent = goal.target;
                            newStatus = client_1.GoalStatus.CONCLUIDA;
                            isActive = false;
                        }
                    }
                    break;
                case 'CURSOS_CONCLUIDOS':
                    if (courseStatus === 'CONCLUIDO') {
                        const goalTopic = goal.topic?.toUpperCase().trim();
                        const courseTopic = topic?.toUpperCase().trim();
                        if (!goalTopic || goalTopic === courseTopic) {
                            newCurrent += 1;
                            if (newCurrent >= goal.target) {
                                newCurrent = goal.target;
                                newStatus = client_1.GoalStatus.CONCLUIDA;
                                isActive = false;
                            }
                        }
                    }
                    break;
                case 'PERIODO_ESTUDO': {
                    const user = await this.userRepository.findById(String(goal.userId));
                    if (!user)
                        break;
                    const streakAtStart = goal.streakAtStart ?? 0;
                    const currentStreak = user.currentLoginStreak ?? 0;
                    newCurrent = Math.max(0, currentStreak - streakAtStart);
                    if (newCurrent >= goal.target) {
                        newCurrent = goal.target;
                        newStatus = client_1.GoalStatus.CONCLUIDA;
                        isActive = false;
                    }
                    break;
                }
            }
            await this.goalsRepository.update(goal.id, {
                current: newCurrent,
                status: newStatus,
                isActive,
                updatedAt: new Date(),
            });
        }
    }
    async getOverview(userId) {
        const goals = await this.getAll(userId);
        const activeGoals = goals.filter((g) => g.isActive && g.status === client_1.GoalStatus.ATIVA);
        const inactiveGoals = goals.filter((g) => !g.isActive && g.status === client_1.GoalStatus.VENCIDA);
        const completedGoals = goals.filter((g) => !g.isActive && g.status === client_1.GoalStatus.CONCLUIDA);
        const hourGoals = goals.filter((g) => g.type === client_1.GoalType.HORAS_TOTAIS || g.type === client_1.GoalType.HORAS_TOPICO);
        const studiedHours = hourGoals.reduce((sum, g) => sum + (g.current ?? 0), 0);
        const targetHours = hourGoals.reduce((sum, g) => sum + (g.target ?? 0), 0);
        return {
            activeGoals: activeGoals.length,
            goalsCompleted: completedGoals.length,
            goalsRating: (completedGoals.length /
                (activeGoals.length + completedGoals.length + inactiveGoals.length ||
                    1)) *
                100,
            totalProgressInHours: studiedHours,
            totalGoalInHours: targetHours,
        };
    }
    async getAllUsers() {
        const goals = await this.goalsRepository.findAll();
        const userIds = Array.from(new Set(goals.map((g) => g.userId)));
        return userIds.map((id) => ({ id }));
    }
};
exports.GoalService = GoalService;
exports.GoalService = GoalService = __decorate([
    __param(0, (0, common_1.Inject)('IGoalsRepository')),
    __param(1, (0, common_1.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object, Object])
], GoalService);
//# sourceMappingURL=goal.service.js.map