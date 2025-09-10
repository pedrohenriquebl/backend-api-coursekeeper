import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/application/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async requestPasswordReset(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return { message: 'Se o e-mail existir, enviaremos instruções' };

    const token = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.RESET_SECRET, expiresIn: '1h' },
    );

    // Aqui você pode salvar o token no banco se quiser invalidar depois
    // e também mandar por e-mail.
    return { message: 'E-mail enviado', token }; // enquanto não tem e-mail, retorna direto
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.RESET_SECRET,
      });

      const user = await this.userService.findById(payload.sub);
      if (!user) throw new Error('Usuário inválido');

      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;

      await this.userService.updateUser(String(user.id), { password: hashed });

      return { message: 'Senha redefinida com sucesso' };
    } catch {
      throw new Error('Token inválido ou expirado');
    }
  }
}
