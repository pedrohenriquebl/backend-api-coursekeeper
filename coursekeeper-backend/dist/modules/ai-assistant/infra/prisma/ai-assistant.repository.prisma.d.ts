import { ChatMessage } from '../../domain/entities/chat-message.entity';
import { IAiAssistantRepository } from '../../domain/repositories/ai-assistant.repository';
import { PrismaService } from 'src/prisma.service';
export declare class AiAssistantRepositoryPrisma implements IAiAssistantRepository {
    private prisma;
    constructor(prisma: PrismaService);
    saveMessage(message: ChatMessage): Promise<ChatMessage>;
    getRecentMessages(userId: number, limit: number): Promise<ChatMessage[]>;
    getAllMessages(userId: number): Promise<ChatMessage[]>;
}
