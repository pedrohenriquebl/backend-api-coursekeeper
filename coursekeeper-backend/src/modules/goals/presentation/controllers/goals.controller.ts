import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GoalService } from '../../application/services/goal.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateGoalDto } from '../dto/create-goals.dto';

@ApiTags('goals')
@Controller('goals/:userId')
@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard('jwt'))
export class GoalsController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: CreateGoalDto,
  ) {
    return this.goalService.create(userId, dto);
  }

  @Get('overview')
  getOverview(@Param('userId', ParseIntPipe) userId: number) {
    return this.goalService.getOverview(userId);
  }

  @Get()
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.goalService.getAll(userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.goalService.getById(id, userId);
  }

  @Put(':id')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id') id: number,
    @Body() dto: Partial<CreateGoalDto>,
  ) {
    return this.goalService.update(id, userId, dto);
  }

  @Delete(':id')
  remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id') id: number,
  ) {
    return this.goalService.delete(id, userId);
  }
}
