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
exports.PrismaUserRepository = void 0;
const prisma_service_1 = require("../../../../prisma.service");
const user_entity_1 = require("../../domain/entities/user.entity");
const common_1 = require("@nestjs/common");
let PrismaUserRepository = class PrismaUserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        const user = await this.prisma.client.user.findFirst({
            where: {
                email,
                deletedAt: null,
            },
        });
        if (!user)
            return null;
        return new user_entity_1.User(user.id, user.firstName, user.lastName, user.email, user.password, user.cpf, user.profileImage, user.description, user.createdAt, user.updatedAt, user.deletedAt, user.linkedin, user.github, user.website, user.currentLoginStreak ?? 0, user.maxLoginStreak ?? 0, user.lastLogin ?? null, user.subscriptionPlan, user.subscriptionValidUntil);
    }
    async create(user) {
        const createdUser = await this.prisma.client.user.create({
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                cpf: user.cpf,
                profileImage: user.profileImage,
                description: user.description,
                linkedin: user.linkedin,
                github: user.github,
                website: user.website,
                currentLoginStreak: user.currentLoginStreak ?? 0,
                maxLoginStreak: user.maxLoginStreak ?? 0,
                lastLogin: user.lastLogin ?? null,
                subscriptionPlan: user.subscriptionPlan,
                subscriptionValidUntil: user.subscriptionValidUntil ?? null,
                acceptedTermsAt: user.acceptedTermsAt ?? new Date(),
                acceptedPrivacyAt: user.acceptedPrivacyAt ?? new Date(),
            },
        });
        return new user_entity_1.User(createdUser.id, createdUser.firstName, createdUser.lastName, createdUser.email, createdUser.password, createdUser.cpf, createdUser.profileImage, createdUser.description, createdUser.createdAt, createdUser.updatedAt, createdUser.deletedAt, createdUser.linkedin, createdUser.github, createdUser.website, createdUser.currentLoginStreak, createdUser.maxLoginStreak, createdUser.lastLogin, createdUser.subscriptionPlan, createdUser.subscriptionValidUntil);
    }
    async update(user) {
        const updatedUser = await this.prisma.client.user.update({
            where: { id: user.id },
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                cpf: user.cpf,
                profileImage: user.profileImage,
                description: user.description,
                linkedin: user.linkedin,
                github: user.github,
                website: user.website,
                currentLoginStreak: user.currentLoginStreak ?? 0,
                maxLoginStreak: user.maxLoginStreak ?? 0,
                lastLogin: user.lastLogin ?? undefined,
                subscriptionPlan: user.subscriptionPlan,
                subscriptionValidUntil: user.subscriptionValidUntil ?? null,
            },
        });
        return new user_entity_1.User(updatedUser.id, updatedUser.firstName, updatedUser.lastName, updatedUser.email, updatedUser.password, updatedUser.cpf, updatedUser.profileImage, updatedUser.description, updatedUser.createdAt, updatedUser.updatedAt, updatedUser.deletedAt, updatedUser.linkedin, updatedUser.github, updatedUser.website, updatedUser.currentLoginStreak, updatedUser.maxLoginStreak, updatedUser.lastLogin, updatedUser.subscriptionPlan, updatedUser.subscriptionValidUntil);
    }
    async findById(id) {
        const user = await this.prisma.client.user.findFirst({
            where: {
                id: Number(id),
                deletedAt: null,
            },
        });
        if (!user)
            return null;
        return new user_entity_1.User(user.id, user.firstName, user.lastName, user.email, user.password, user.cpf, user.profileImage, user.description, user.createdAt, user.updatedAt, user.deletedAt, user.linkedin, user.github, user.website, user.currentLoginStreak ?? 0, user.maxLoginStreak ?? 0, user.lastLogin ?? null, user.subscriptionPlan, user.subscriptionValidUntil);
    }
    async findByCpf(cpf) {
        return await this.prisma.client.user.findFirst({
            where: {
                cpf,
                deletedAt: null,
            },
        });
    }
    async delete(id) {
        await this.prisma.client.user.update({
            where: { id: Number(id) },
            data: { deletedAt: new Date() },
        });
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map