import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let cachedServer: express.Express;

/**
 * Inicializa o Nest em um ExpressApp e retorna
 * para ser usado como handler serverless
 */
async function bootstrapServer(): Promise<express.Express> {
  if (cachedServer) return cachedServer;

  const expressApp = express();

  // Configuração CORS (para qualquer frontend)
  expressApp.use(
    cors({
      origin: '*', // ou coloque a URL do seu frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuração Swagger
  const config = new DocumentBuilder()
    .setTitle('CourseKeeper API')
    .setDescription('API for managing users')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'jwt-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.init();

  cachedServer = expressApp;
  return cachedServer;
}

/**
 * Handler que o Vercel vai chamar
 */
export default async function handler(req: Request, res: Response) {
  try {
    const server = await bootstrapServer();
    return server(req, res);
  } catch (err) {
    console.error('Serverless handler error:', err);
    res.status(500).send('Internal Server Error');
  }
}
