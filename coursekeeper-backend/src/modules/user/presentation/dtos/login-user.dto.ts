import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../domain/entities/user.entity';

export class LoginUserDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginResponseDto {
  access_token: string;
  user: Omit<User, 'password'>;
}