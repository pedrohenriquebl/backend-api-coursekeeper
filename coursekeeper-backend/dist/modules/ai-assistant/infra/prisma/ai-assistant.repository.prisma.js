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
exports.AiAssistantRepositoryPrisma = void 0;
const common_1 = require("@nestjs/common");
const chat_message_entity_1 = require("../../domain/entities/chat-message.entity");
const prisma_service_1 = require("../../../../prisma.service");
let AiAssistantRepositoryPrisma = class AiAssistantRepositoryPrisma {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async saveMessage(message) {
        const created = await this.prisma.client.chatMessage.create({
            data: {
                userId: message.userId,
                role: message.role,
                message: message.message,
            },
        });
        return new chat_message_entity_1.ChatMessage(created.userId, created.role, created.message, created.createdAt, created.id);
    }
    async getRecentMessages(userId, limit) {
        const messages = await this.prisma.client.chatMessage.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' },
            take: limit,
        });
        return messages.map((m) => new chat_message_entity_1.ChatMessage(m.userId, m.role, m.message, m.createdAt, m.id));
    }
    async getAllMessages(userId) {
        const messages = await this.prisma.client.chatMessage.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' },
        });
        return messages.map((m) => new chat_message_entity_1.ChatMessage(m.userId, m.role, m.message, m.createdAt, m.id));
    }
};
exports.AiAssistantRepositoryPrisma = AiAssistantRepositoryPrisma;
exports.AiAssistantRepositoryPrisma = AiAssistantRepositoryPrisma = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AiAssistantRepositoryPrisma);
//# sourceMappingURL=ai-assistant.repository.prisma.js.map