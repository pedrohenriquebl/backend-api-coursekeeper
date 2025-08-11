import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { AuthService } from '../../../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createUser(dto);
  }

  @ApiOperation({ summary: 'Login a user' })
  @Post('login')
  async loginUser(@Body() loginDto: LoginUserDto) {
    const loginResult = await this.userService.login(loginDto);
    if (!loginResult) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    return loginResult;
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.updateUser(id, dto);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.softDeleteUser(id);
  }
}
