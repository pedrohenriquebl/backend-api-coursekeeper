// src/serverless.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let cachedServer: express.Express;

/**
 * Inicializa o Nest em um ExpressApp para serverless
 */
async function bootstrapServer(): Promise<express.Express> {
  if (cachedServer) return cachedServer;

  const expressApp = express();

  // Cria o Nest app com ExpressAdapter
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // Configuração global de validação
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos extras
      forbidNonWhitelisted: true, // lança erro se campos extras enviados
      transform: true, // converte tipos automaticamente
    }),
  );

  // Configuração CORS (permitindo frontend Vercel e localhost)
  app.enableCors({
    origin: [
      'https://frontend-coursekeeper.vercel.app',
      'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

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
  SwaggerModule.setup('doc', app, document); // rota Swagger: /doc

  await app.init();

  cachedServer = expressApp;
  return cachedServer;
}

/**
 * Handler chamado pelo Vercel
 */
export default async function handler(req: Request, res: Response) {
  try {
    const server = await bootstrapServer();
    return server(req, res);
  } catch (err) {
    console.error('Serverless handler error:', err);
    res.status(500).send({ statusCode: 500, message: 'Internal Server Error' });
  }
}
