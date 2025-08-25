import { Controller, Get, Param } from '@nestjs/common';
import { AchievementsService } from '../../application/services/achievements.service';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}
  
  @Get('check/:userId')
  async check(@Param('userId') userId: string) {
    await this.achievementsService.checkAndAssign(Number(userId));
    return { message: 'Achievements checked' };
  }
  
  @Get('user/:userId')
  async listUserAchievements(@Param('userId') userId: string) {
    return this.achievementsService.listUserAchievements(Number(userId));
  }
  
  @Get()
  async listAllAchievements() {
    return this.achievementsService.listAllAchievements();
  }
}
