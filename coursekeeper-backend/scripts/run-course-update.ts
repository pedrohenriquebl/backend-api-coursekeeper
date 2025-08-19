import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DailyUpdateCronService } from '../src/modules/courses/application/tasks/course-status.task';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tasks = app.get(DailyUpdateCronService);
  await tasks.handleDailyUpdate();
  await app.close();
}

bootstrap();