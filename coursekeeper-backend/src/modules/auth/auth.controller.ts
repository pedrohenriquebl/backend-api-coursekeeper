import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestPasswordResetDto } from '../user/presentation/dtos/request-password-reset.dto';
import { ResetPasswordDto } from '../user/presentation/dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-password-reset')
  async requestReset(@Body() dto: RequestPasswordResetDto) {
    return this.authService.requestPasswordReset(dto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }
}
