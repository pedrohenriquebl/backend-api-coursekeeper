import { AuthService } from './auth.service';
import { RequestPasswordResetDto } from '../user/presentation/dtos/request-password-reset.dto';
import { ResetPasswordDto } from '../user/presentation/dtos/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    requestReset(dto: RequestPasswordResetDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
