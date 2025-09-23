import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CourseService } from '../../application/services/courses.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { UpdateCourseDto } from '../dtos/update-course.dto';
import { FindCoursesQueryDto } from '../dtos/query-course.dto';

@ApiTags('courses')
@Controller('courses/:userId')
@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard('jwt'))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'query', required: false, type: String })
  @ApiQuery({ name: 'topic', required: false, type: String, example: 'all' })
  @ApiQuery({ name: 'platform', required: false, type: String, example: 'all' })
  @ApiQuery({ name: 'status', required: false, type: String, example: 'all' })
  async findAllByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() query: FindCoursesQueryDto,
  ) {
    const { page, limit, query: q, topic, platform, status } = query;

    return this.courseService.findAllByUser(userId, {
      page,
      limit,
      query: q,
      topic: topic === 'all' ? undefined : topic,
      platform: platform === 'all' ? undefined : platform,
      status: status === 'all' ? undefined : status,
    });
  }

  @Get('all')
  async findAllByUserNoPagination(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.courseService.findAllByUserSimple(userId);
  }

  @Get('recent')
  async findRecentByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.courseService.findRecentByUser(userId);
  }

  @Get(':courseId')
  async findById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.courseService.findById(userId, courseId);
  }

  @Post()
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: CreateCourseDto,
  ) {
    return this.courseService.create(userId, dto);
  }

  @Put()
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.courseService.update(userId, dto.id, dto);
  }

  @Delete(':courseId')
  @HttpCode(204)
  async delete(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    await this.courseService.delete(+userId, +courseId);
  }
}
