import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

let server: express.Express | undefined;

export async function bootstrapServer(): Promise<express.Express> {
  if (server) return server;

  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // initialize Nest without listening to a port (serverless)
  await app.init();
  server = expressApp;
  return server as express.Express;
}

export default async function handler(req: any, res: any) {
  const s = await bootstrapServer();
  return s(req, res);
}
