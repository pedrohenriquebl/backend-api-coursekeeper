import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'CPF must have 11 digits' })
  cpf: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}
