import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaAchievementsRepository } from './infra/prisma/prisma-achievements.repository';
import { UserModule } from '../user/user.module';
import { GoalModule } from '../goals/goals.module';
import { CourseModule } from '../courses/courses.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AchievementsService } from './application/services/achievements.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => GoalModule),
    forwardRef(() => CourseModule),
    CqrsModule,
  ],
  providers: [
    AchievementsService,
    PrismaService,
    {
      provide: 'IAchievementsRepository',
      useClass: PrismaAchievementsRepository,
    },
  ],
  exports: [AchievementsService, 'IAchievementsRepository'],
})
export class AchievementsModule {}
