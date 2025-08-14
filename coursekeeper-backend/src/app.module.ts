import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/presentation/controllers/user.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/courses/courses.module';
import { CourseController } from './modules/courses/presentation/controllers/courses.controller';
import { GoalModule } from './modules/goals/goals.module';
import { GoalsController } from './modules/goals/presentation/controllers/goals.controller';

@Module({
  imports: [UserModule, AuthModule, CourseModule, GoalModule],
  controllers: [
    AppController,
    UserController,
    CourseController,
    GoalsController,
  ],
  providers: [AppService],
})
export class AppModule {}
