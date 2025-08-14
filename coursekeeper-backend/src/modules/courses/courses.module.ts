import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { CourseService } from './application/services/courses.service';
import { PrismaCourseRepository } from './infra/prisma/prisma-courses.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { GoalService } from '../goals/application/services/goal.service';
import { GoalModule } from '../goals/goals.module';

@Module({
  imports: [forwardRef(() => AuthModule), CqrsModule, GoalModule],
  providers: [
    CourseService,
    PrismaService,
    GoalService,
    {
      provide: 'ICourseRepository',
      useClass: PrismaCourseRepository,
    },
  ],
  exports: [CourseService, 'ICourseRepository'],
})
export class CourseModule {}