import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { GoalService } from './application/services/goal.service';
import { PrismaGoalsRepository } from './infra/prisma/prisma-goals.repository';
import { GoalProgressUpdatedHandler } from './application/events/goal-progress-updated.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '../user/user.module';
import { PrismaUserRepository } from '../user/infra/prisma/prisma-user.repository';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    CqrsModule,
  ],
  providers: [
    GoalService,
    PrismaService,
    GoalProgressUpdatedHandler,
    {
      provide: 'IGoalsRepository',
      useClass: PrismaGoalsRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [GoalService, 'IGoalsRepository', 'IUserRepository'],
})
export class GoalModule {}
