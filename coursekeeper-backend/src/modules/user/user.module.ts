import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { PrismaUserRepository } from './infra/prisma/prisma-user.repository';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { CourseModule } from '../courses/courses.module';
import { GoalModule } from '../goals/goals.module';

@Module({
  imports: [forwardRef(() => AuthModule), CourseModule, GoalModule],
  providers: [
    UserService,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
