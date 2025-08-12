import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { UpdateCourseDto } from '../dtos/update-course.dto';

@ApiTags('courses')
@Controller('courses/:userId')
@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard('jwt'))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAllByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.courseService.findAllByUser(+userId);
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
    @Param('userId') userId: string,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    await this.courseService.delete(+userId, +courseId);
  }
}
