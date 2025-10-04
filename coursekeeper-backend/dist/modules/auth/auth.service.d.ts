import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/application/services/user.service';
import { MailService } from '../mail/mail.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly mailService;
    constructor(userService: UserService, jwtService: JwtService, mailService: MailService);
    validateUser(email: string, password: string): Promise<{
        id: number | undefined;
        firstName: string;
        lastName: string;
        email: string;
        cpf: string;
        profileImage?: string | null | undefined;
        description?: string | null | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        deletedAt?: (Date | null) | undefined;
        linkedin?: string | null | undefined;
        github?: string | null | undefined;
        website?: string | null | undefined;
        currentLoginStreak?: number | null | undefined;
        maxLoginStreak?: number | null | undefined;
        lastLogin?: (Date | null) | undefined;
        subscriptionPlan: "FREE" | "GOLD" | "PLATINUM";
        subscriptionValidUntil?: (Date | null) | undefined;
        acceptedTermsAt?: (Date | null) | undefined;
        acceptedPrivacyAt?: (Date | null) | undefined;
    } | null>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    requestPasswordReset(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
