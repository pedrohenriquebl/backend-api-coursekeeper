import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendPasswordReset(to: string, token: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.transporter.sendMail({
      from: `"CourseKeeper" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Redefinição de senha',
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(to right, #10b981, #059669); padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">CourseKeeper</h1>
        </div>
        <div style="padding: 20px; color: #333;">
          <p>Olá,</p>
          <p>Você solicitou a redefinição de senha. Clique no botão abaixo para criar uma nova senha:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="
              display: inline-block;
              background-color: #10b981;
              color: white;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-weight: bold;
            ">Redefinir senha</a>
          </div>
          <p style="font-size: 12px; color: #777;">Se você não solicitou essa alteração, pode ignorar este email.</p>
          <p style="font-size: 12px; color: #777;">Este link expira em 1 hora.</p>
        </div>
      </div>
    </div>
  `,
    });

    console.log(`E-mail de redefinição enviado para: ${to}`);
  }
}
