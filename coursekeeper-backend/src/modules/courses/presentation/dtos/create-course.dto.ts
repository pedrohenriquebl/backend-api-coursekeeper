import { ApiProperty } from '@nestjs/swagger';
import { CourseStatus, Language, Platform, Topic } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty()
  @IsEnum(Platform)
  platform: Platform;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  platformCustom?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  studiedHours: number;

  @ApiProperty()
  @IsEnum(Topic)
  topic: Topic;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  topicCustom?: string | null;

  @ApiProperty()
  @IsEnum(Language)
  language: Language;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  languageCustom?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsNumber()
  rating: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  comment?: string | null;

  @ApiProperty({ readOnly: true })
  @IsEnum(CourseStatus)
  status?: CourseStatus;

  @IsDateString()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate?: string | null;

  @IsOptional()
  @IsString()
  instructor?: string | null;
}
