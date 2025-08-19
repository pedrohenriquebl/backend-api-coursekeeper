import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GoalService } from '../services/goal.service';

@Injectable()
export class GoalCronService {
  private readonly logger = new Logger(GoalCronService.name);

  constructor(private readonly goalService: GoalService) {}

  // roda todos os dias à meia-noite
  @Cron('0 0 * * *', { timeZone: 'America/Sao_Paulo' })
  async handleDailyGoalUpdate() {
    this.logger.log('Iniciando atualização diária de metas...');

    const allUsers = await this.goalService.getAllUsers();

    for (const user of allUsers) {
      await this.goalService.updateGoalProgress(user.id, 0);
      this.logger.log(`Metas do usuário ${user.id} atualizadas.`);
    }

    this.logger.log('Atualização diária de metas concluída.');
  }
}
