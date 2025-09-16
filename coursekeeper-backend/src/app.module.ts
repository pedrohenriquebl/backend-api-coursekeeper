import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/presentation/controllers/user.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/courses/courses.module';
import { CourseController } from './modules/courses/presentation/controllers/courses.controller';
import { GoalModule } from './modules/goals/goals.module';
import { GoalsController } from './modules/goals/presentation/controllers/goals.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { DailyUpdateCronService } from './modules/courses/application/tasks/course-status.task';
import { AchievementsModule } from './modules/achievements/achievements.module';
import { AchievementsController } from './modules/achievements/presentation/controllers/achievements.controller';
import { AiAssistantModule } from './modules/ai-assistant/ai-assistant.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CourseModule,
    GoalModule,
    AchievementsModule,
    AiAssistantModule,
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public',
    }),
  ],
  controllers: [
    AppController,
    UserController,
    CourseController,
    GoalsController,
    AchievementsController,    
  ],
  providers: [AppService, Reflector, DailyUpdateCronService],
})
export class AppModule {}
