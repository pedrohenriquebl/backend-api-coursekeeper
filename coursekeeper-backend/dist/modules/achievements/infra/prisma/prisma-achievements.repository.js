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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAchievementsRepository = void 0;
const common_1 = require("@nestjs/common");
const achievement_entity_1 = require("../../domain/entities/achievement.entity");
const prisma_service_1 = require("../../../../prisma.service");
let PrismaAchievementsRepository = class PrismaAchievementsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const achievements = await this.prisma.client.achievement.findMany();
        return achievements.map((a) => new achievement_entity_1.Achievement(a.id, a.code, a.name, a.description, a.icon ?? undefined, a.condition ? a.condition : undefined));
    }
    async findById(id) {
        const a = await this.prisma.client.achievement.findUnique({
            where: { id },
        });
        if (!a)
            return null;
        return new achievement_entity_1.Achievement(a.id, a.code, a.name, a.description, a.icon ?? undefined, a.condition ? a.condition : undefined);
    }
    async userHasAchievement(userId, achievementId) {
        const userAchievement = await this.prisma.client.userAchievement.findUnique({
            where: { userId_achievementId: { userId, achievementId } },
        });
        return !!userAchievement;
    }
    async assignToUser(userId, achievementId) {
        await this.prisma.client.userAchievement.create({
            data: { userId, achievementId },
        });
    }
};
exports.PrismaAchievementsRepository = PrismaAchievementsRepository;
exports.PrismaAchievementsRepository = PrismaAchievementsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAchievementsRepository);
//# sourceMappingURL=prisma-achievements.repository.js.map