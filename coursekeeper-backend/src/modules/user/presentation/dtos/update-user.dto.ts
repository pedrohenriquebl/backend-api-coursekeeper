import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(6, 20)
  password?: string;

  @ApiProperty()
  @IsOptional()
  @Matches(/^\d{11}$/, { message: 'CPF must have 11 digits' })
  cpf?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}
