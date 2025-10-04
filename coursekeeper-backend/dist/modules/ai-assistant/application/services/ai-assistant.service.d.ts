import { PrismaService } from 'src/prisma.service';
import type { IAiAssistantRepository } from '../../domain/repositories/ai-assistant.repository';
export declare class AiAssistantService {
    private prisma;
    private readonly aiRepo;
    private readonly openai;
    private readonly MAX_TOKENS;
    private readonly logger;
    constructor(prisma: PrismaService, aiRepo: IAiAssistantRepository);
    chatWithUser(userId: number, message: string): Promise<string>;
}
