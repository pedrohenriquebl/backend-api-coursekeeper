import { Module } from '@nestjs/common';
import { AiAssistantService } from './application/services/ai-assistant.service';
import { PrismaService } from 'src/prisma.service';
import { AiAssistantRepositoryPrisma } from './infra/prisma/ai-assistant.repository.prisma';
import { AiAssistantController } from './presentation/controllers/ai-assistant.controller';

@Module({
  controllers: [AiAssistantController],
  providers: [
    AiAssistantService,
    PrismaService,
    {
      provide: 'IAiAssistantRepository',
      useClass: AiAssistantRepositoryPrisma,
    },
  ],
  exports: [AiAssistantService],
})
export class AiAssistantModule {}
