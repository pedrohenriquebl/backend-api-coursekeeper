import { Injectable } from '@nestjs/common';
import prisma from './prisma-client';

@Injectable()
export class PrismaService {
  client = prisma;
}
