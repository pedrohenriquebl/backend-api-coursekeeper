"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("../../domain/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const goal_service_1 = require("../../../goals/application/services/goal.service");
const client_1 = require("@prisma/client");
const achievements_service_1 = require("../../../achievements/application/services/achievements.service");
const plan_duration_enum_1 = require("../../domain/enums/plan-duration.enum");
let UserService = class UserService {
    userRepository;
    courseRepository;
    jwtService;
    goalService;
    achievementsService;
    constructor(userRepository, courseRepository, jwtService, goalService, achievementsService) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.jwtService = jwtService;
        this.goalService = goalService;
        this.achievementsService = achievementsService;
    }
    async createUser(dto) {
        if (!dto.acceptedTerms || !dto.acceptedPrivacy) {
            throw new common_1.ConflictException('Você precisa aceitar os termos de uso e a política de privacidade.');
        }
        const existingCpfUser = await this.userRepository.findByCpf(dto.cpf);
        if (existingCpfUser) {
            throw new common_1.ConflictException('Usuário com CPF já cadastrado');
        }
        const existingEmailUser = await this.userRepository.findByEmail(dto.email);
        if (existingEmailUser) {
            throw new common_1.ConflictException('Usuário com email já cadastrado');
        }
        const hashPassword = await bcrypt.hash(dto.password, 10);
        const user = new user_entity_1.User(undefined, dto.firstName, dto.lastName, dto.email, hashPassword, dto.cpf, dto.profileImage ?? null, dto.description ?? null, new Date(), new Date(), null, null, null, null, 0, 0, null, 'FREE', null, new Date(), new Date());
        return this.userRepository.create(user);
    }
    async updateUser(id, dto) {
        const user = await this.userRepository.findById(id);
        if (!user)
            return null;
        user.firstName = dto.firstName ?? user.firstName;
        user.lastName = dto.lastName ?? user.lastName;
        user.email = dto.email ?? user.email;
        user.cpf = dto.cpf ?? user.cpf;
        user.profileImage = dto.profileImage ?? user.profileImage;
        user.description = dto.description ?? user.description;
        user.website = dto.website ?? user.website;
        user.github = dto.github ?? user.github;
        user.linkedin = dto.linkedin ?? user.linkedin;
        user.updatedAt = new Date();
        if (dto.password) {
            user.password = await bcrypt.hash(dto.password, 10);
        }
        return this.userRepository.update(user);
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async findById(id) {
        return this.userRepository.findById(id);
    }
    async findByCpf(cpf) {
        return this.userRepository.findByCpf(cpf);
    }
    async restoreUser(id) {
        const user = await this.userRepository.findById(id);
        if (!user)
            return null;
        user.deletedAt = null;
        return this.userRepository.update(user);
    }
    async softDeleteUser(id) {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new Error('User not found');
        user.deletedAt = new Date();
        await this.userRepository.update(user);
    }
    async login(loginDto) {
        const user = await this.userRepository.findByEmail(loginDto.email);
        if (!user)
            return null;
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid)
            return null;
        this.checkSubscriptionExpiration(user);
        await this.userRepository.update(user);
        const now = new Date();
        let currentStreak = user.currentLoginStreak ?? 0;
        let maxStreak = user.maxLoginStreak ?? 0;
        if (user.lastLogin) {
            console.log(`Last Login: ${user.lastLogin}`);
            const lastLoginDate = new Date(user.lastLogin);
            const diffInDays = this.differenceInDays(now, lastLoginDate);
            if (diffInDays === 1) {
                currentStreak += 1;
                console.log(`diffInDays === 1 -> Current Streak incremented to: ${currentStreak}`);
            }
            else if (diffInDays > 1) {
                console.log(`diffInDays > 1 -> Current Streak reset to: 1`);
                currentStreak = 1;
            }
        }
        else {
            currentStreak = 1;
        }
        if (currentStreak > maxStreak) {
            maxStreak = currentStreak;
        }
        await this.userRepository.update({
            ...user,
            currentLoginStreak: currentStreak,
            maxLoginStreak: maxStreak,
            lastLogin: now,
        });
        const userId = user.id;
        if (!userId)
            return null;
        const courseStats = await this.getCourseStats(userId);
        const goalStats = await this.getGoalsStats(userId);
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        const { password, ...userWithoutPassword } = user;
        await this.goalService.updateGoalProgress(userId, 0, '', '');
        await this.achievementsService.checkAndAssign(user.id);
        return {
            access_token: token,
            user: {
                ...userWithoutPassword,
                subscriptionPlan: user.subscriptionPlan,
                subscriptionValidUntil: user.subscriptionValidUntil ?? null,
            },
            courseStats,
            goalsStats: goalStats,
        };
    }
    async getCourseStats(userId) {
        const courses = await this.courseRepository.findAllByUser(userId);
        return {
            totalCourses: courses.length,
            totalCompletedCourses: courses.filter((c) => c.status === 'CONCLUIDO')
                .length,
            totalStudiedHours: courses.reduce((sum, c) => sum + (c.studiedHours ?? 0), 0),
        };
    }
    async getGoalsStats(userId) {
        const goals = await this.goalService.getAll(userId);
        const activeGoals = goals.filter((g) => g.isActive && g.status === 'ATIVA');
        const completedGoals = goals.filter((g) => !g.isActive && g.status === client_1.GoalStatus.CONCLUIDA);
        const totalGoals = activeGoals.length + completedGoals.length;
        let goalsProgressPercent = 0;
        if (totalGoals > 0) {
            const activeProgressSum = activeGoals.reduce((sum, g) => sum + ((g.current ?? 0) / g.target) * 100, 0);
            const completedProgressSum = completedGoals.length * 100;
            goalsProgressPercent =
                (activeProgressSum + completedProgressSum) / totalGoals;
        }
        let latestGoal = null;
        if (goals.length > 0) {
            const activeOrCompletedGoals = goals.filter((g) => g.status !== 'VENCIDA');
            if (activeOrCompletedGoals.length > 0) {
                const sortedGoals = [...activeOrCompletedGoals].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                const recent = sortedGoals[0];
                latestGoal = {
                    title: recent.title,
                    target: recent.target,
                    current: recent.current,
                    status: recent.status,
                };
            }
        }
        return {
            goalsProgressPercent,
            latestGoal,
        };
    }
    async updateSubscription(userId, dto) {
        const user = await this.userRepository.findById(userId.toString());
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        user.subscriptionPlan = dto.subscriptionPlan;
        if (dto.subscriptionPlan === client_1.SubscriptionPlan.FREE) {
            user.subscriptionValidUntil = null;
        }
        else {
            const planDuration = dto.duration === 'annual' ? plan_duration_enum_1.PlanDuration.ANNUAL : plan_duration_enum_1.PlanDuration.MONTHLY;
            user.subscriptionValidUntil = this.calculateValidUntil(planDuration);
        }
        user.updatedAt = new Date();
        return this.userRepository.update(user);
    }
    async upgradePlan(id, plan, duration) {
        const user = await this.userRepository.findById(id);
        if (!user)
            return null;
        user.subscriptionPlan = plan;
        user.subscriptionValidUntil = this.calculateValidUntil(duration);
        user.updatedAt = new Date();
        return this.userRepository.update(user);
    }
    calculateValidUntil(duration) {
        const now = new Date();
        if (duration === plan_duration_enum_1.PlanDuration.MONTHLY) {
            now.setMonth(now.getMonth() + 1);
        }
        else if (duration === plan_duration_enum_1.PlanDuration.ANNUAL) {
            now.setFullYear(now.getFullYear() + 1);
        }
        return now;
    }
    checkSubscriptionExpiration(user) {
        if (user.subscriptionValidUntil &&
            new Date() > user.subscriptionValidUntil) {
            user.subscriptionPlan = client_1.SubscriptionPlan.FREE;
            user.subscriptionValidUntil = null;
        }
        if (user.subscriptionPlan === client_1.SubscriptionPlan.FREE) {
            user.subscriptionValidUntil = null;
        }
    }
    async validateSubscription(user) {
        if (user.subscriptionValidUntil &&
            new Date() > user.subscriptionValidUntil) {
            user.subscriptionPlan = client_1.SubscriptionPlan.FREE;
            user.subscriptionValidUntil = null;
            user.updatedAt = new Date();
            return this.userRepository.update(user);
        }
        return user;
    }
    differenceInDays(date1, date2) {
        const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        const diffTime = d1.getTime() - d2.getTime();
        return diffTime / (1000 * 60 * 60 * 24);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __param(1, (0, common_1.Inject)('ICourseRepository')),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService,
        goal_service_1.GoalService,
        achievements_service_1.AchievementsService])
], UserService);
//# sourceMappingURL=user.service.js.map