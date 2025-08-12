import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { CourseService } from './application/services/courses.service';
import { PrismaCourseRepository } from './infra/prisma/prisma-courses.repository';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [
    CourseService,
    PrismaService,
    {
      provide: 'ICourseRepository',
      useClass: PrismaCourseRepository,
    },
  ],
  exports: [CourseService, 'ICourseRepository'],
})
export class CourseModule {}