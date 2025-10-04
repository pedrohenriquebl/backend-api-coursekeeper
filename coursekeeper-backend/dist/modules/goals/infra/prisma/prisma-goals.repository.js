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
exports.PrismaGoalsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma.service");
let PrismaGoalsRepository = class PrismaGoalsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(goal) {
        return this.prisma.client.goal.create({ data: goal });
    }
    async findById(id) {
        return this.prisma.client.goal.findUnique({
            where: { id },
        });
    }
    async findAllByUser(userId) {
        return this.prisma.client.goal.findMany({
            where: { userId },
        });
    }
    async update(id, data) {
        const cleanData = this.toPrismaGoal(data);
        const updatedGoal = await this.prisma.client.goal.update({
            where: { id },
            data: cleanData,
        });
        return this.fromPrismaGoal(updatedGoal);
    }
    async delete(id) {
        await this.prisma.client.goal.delete({ where: { id } });
    }
    toPrismaGoal(goal) {
        return {
            ...goal,
            status: goal.status,
            type: goal.type,
            current: goal.current !== undefined ? Number(goal.current) : undefined,
            target: goal.target !== undefined ? Number(goal.target) : undefined,
            deadline: goal.deadline ? new Date(goal.deadline) : undefined,
            createdAt: goal.createdAt ? new Date(goal.createdAt) : undefined,
            updatedAt: goal.updatedAt ? new Date(goal.updatedAt) : undefined,
            completedAt: goal.completedAt ? new Date(goal.completedAt) : undefined,
        };
    }
    fromPrismaGoal(goal) {
        return {
            ...goal,
            status: goal.status,
            type: goal.type,
            deadline: goal.deadline ? new Date(goal.deadline) : null,
            createdAt: new Date(goal.createdAt),
            updatedAt: new Date(goal.updatedAt),
            completedAt: goal.completedAt ? new Date(goal.completedAt) : null,
        };
    }
    findAll() {
        return this.prisma.client.goal.findMany();
    }
};
exports.PrismaGoalsRepository = PrismaGoalsRepository;
exports.PrismaGoalsRepository = PrismaGoalsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaGoalsRepository);
//# sourceMappingURL=prisma-goals.repository.js.map