import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CourseService } from '../services/courses.service';
import { GoalService } from 'src/modules/goals/application/services/goal.service';

@Injectable()
export class DailyUpdateCronService {
  private readonly logger = new Logger(DailyUpdateCronService.name);

  constructor(
    private readonly courseService: CourseService,
    private readonly goalService: GoalService,
  ) {}

  // Roda todos os dias às 03:00 da manhã
  @Cron('11 10 * * *', { timeZone: 'America/Sao_Paulo' })
  async handleDailyUpdate() {
    this.logger.log('Iniciando atualização diária de cursos e metas...');

    await this.updateCoursesStatus();
    await this.updateGoalsStatus();

    this.logger.log('Atualização diária concluída.');
  }

  private async updateCoursesStatus() {
    const courses = await this.courseService.findAll();
    const now = new Date();

    for (const course of courses) {
      if (course.endDate && now > course.endDate && course.status !== 'NAO_CONCLUIDO') {
        await this.courseService.systemUpdateCourse(course, {
          status: 'NAO_CONCLUIDO',
        });
        this.logger.log(`Curso ${course.id} marcado como NAO_CONCLUIDO`);
      }
    }
  }

  private async updateGoalsStatus() {
    const allUsers = await this.goalService.getAllUsers();

    for (const user of allUsers) {
      await this.goalService.updateGoalProgress(user.id, 0);
      this.logger.log(`Metas do usuário ${user.id} atualizadas.`);
    }
  }
}
