import { ApiProperty } from '@nestjs/swagger';
import { CourseStatus, Language, Platform, Topic } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(Platform)
  platform?: Platform;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  platformCustom?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  studiedHours?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(Topic)
  topic?: Topic;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  topicCustom?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(Language)
  language?: Language;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  languageCustom?: string | null;
  
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  comment?: string | null;

  @ApiProperty({ readOnly: true })
  @IsEnum(CourseStatus)
  status?: CourseStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  instructor?: string | null;
}
