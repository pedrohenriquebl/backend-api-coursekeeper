import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const frontendUrl =
      process.env.FRONTEND_URL || 'https://frontend-coursekeeper.vercel.app/';
    return `🚀 Backend is up and running! You can access the frontend here: ${frontendUrl}`;
  }
}
