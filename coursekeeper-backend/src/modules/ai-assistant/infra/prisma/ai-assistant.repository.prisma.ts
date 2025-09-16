import { Injectable } from '@nestjs/common';
import { ChatMessage } from '../../domain/entities/chat-message.entity';
import { IAiAssistantRepository } from '../../domain/repositories/ai-assistant.repository';
import { PrismaService } from 'src/prisma.service';
import { ChatRole } from '@prisma/client';

@Injectable()
export class AiAssistantRepositoryPrisma implements IAiAssistantRepository {
  constructor(private prisma: PrismaService) {}

  async saveMessage(message: ChatMessage): Promise<ChatMessage> {
    const created = await this.prisma.chatMessage.create({
      data: {
        userId: message.userId,
        role: message.role,
        message: message.message,
      },
    });
    return new ChatMessage(created.userId, created.role as ChatRole, created.message, created.createdAt, created.id);
  }

  async getRecentMessages(userId: number, limit: number): Promise<ChatMessage[]> {
    const messages = await this.prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });
    return messages.map(
      (m) => new ChatMessage(m.userId, m.role as ChatRole, m.message, m.createdAt, m.id)
    );
  }

  async getAllMessages(userId: number): Promise<ChatMessage[]> {
    const messages = await this.prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
    return messages.map(
      (m) => new ChatMessage(m.userId, m.role as ChatRole, m.message, m.createdAt, m.id)
    );
  }
}
