import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { PrismaUserRepository } from './infra/prisma/prisma-user.repository';
import { PrismaService } from '../../prisma.service';
@Module({
  providers: [
    UserService,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
