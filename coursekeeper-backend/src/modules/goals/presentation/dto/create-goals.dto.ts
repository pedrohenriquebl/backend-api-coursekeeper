import {
  IsString,
  IsEnum,
  IsInt,
  IsDateString,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { GoalType, GoalUnits, GoalStatus, Topic } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsEnum(GoalType)
  type: GoalType;

  @ApiProperty({ required: false, nullable: true, enum: Topic })
  @ValidateIf((o) => o.type === 'HORAS_TOPICO')
  @IsEnum(Topic)
  topic?: Topic | null;

  @ApiProperty()
  @IsInt()
  target: number;

  @ApiProperty()
  @IsEnum(GoalUnits)
  unit: GoalUnits;

  @ApiProperty()
  @IsDateString()
  deadline: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string | null;
}
