import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { GoalService } from './application/services/goal.service';
import { PrismaGoalsRepository } from './infra/prisma/prisma-goals.repository';
import { GoalProgressUpdatedHandler } from './application/events/goal-progress-updated.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [forwardRef(() => AuthModule), CqrsModule],
  providers: [
    GoalService,
    PrismaService,
    GoalProgressUpdatedHandler,
    {
      provide: 'IGoalsRepository',
      useClass: PrismaGoalsRepository,
    },
  ],
  exports: [GoalService, 'IGoalsRepository'],
})
export class GoalModule {}