import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { AuthService } from '../../../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { avatarMulterOptions } from 'src/common/upload/avatar.multer';
import { UpdateSubscriptionDto } from '../dtos/update-subscription.dto';
import { UpgradePlanDto } from '../dtos/upgrade-plan.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @Post('register')
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

  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'User Information' })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Req() req: Request & { user: User }) {
    const user = req.user;

    if (!user) throw new UnauthorizedException();

    const validatedUser = await this.userService.validateSubscription(user);

    const generalCoursesInfo = await this.userService.getCourseStats(
      Number(validatedUser.id),
    );
    const goalsStats = await this.userService.getGoalsStats(
      Number(validatedUser.id),
    );

    return {
      ...validatedUser,
      subscriptionPlan: validatedUser.subscriptionPlan || 'FREE',
      subscriptionValidUntil: validatedUser.subscriptionValidUntil || null,
      generalCoursesInfo,
      goalsStats,
    };
  }

  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Upload avatar do usuário logado' })
  @UseGuards(AuthGuard('jwt'))
  @Post('me/avatar')
  @UseInterceptors(FileInterceptor('file', avatarMulterOptions))
  async uploadMyAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request & { user: any },
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo é obrigatório');
    }

    const userId = String(req.user.id);
    const relativePath = `/public/avatars/${file.filename}`;

    const updated = await this.userService.updateUser(userId, {
      profileImage: relativePath,
    });

    return {
      path: relativePath,
      user: updated,
    };
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

  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Update user subscription plan' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/subscription')
  async updateSubscription(
    @Param('id') id: string,
    @Body() dto: UpdateSubscriptionDto,
  ) {
    return this.userService.updateSubscription(Number(id), dto);
  }

  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Upgrade user subscription plan' })
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/subscription/upgrade')
  async upgradeSubscription(
    @Param('id') id: string,
    @Body() dto: UpgradePlanDto,
  ) {
    return this.userService.upgradePlan(id, dto.subscriptionPlan, dto.type);
  }
}
