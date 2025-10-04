"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
let cachedServer;
async function bootstrapServer() {
    if (cachedServer)
        return cachedServer;
    const expressApp = (0, express_1.default)();
    expressApp.use((0, cors_1.default)({
        origin: [
            'https://frontend-coursekeeper.vercel.app',
            'http://localhost:3001',
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CourseKeeper API')
        .setDescription('API for managing users')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
    }, 'jwt-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, document);
    await app.init();
    cachedServer = expressApp;
    return cachedServer;
}
async function handler(req, res) {
    try {
        const server = await bootstrapServer();
        return server(req, res);
    }
    catch (err) {
        console.error('Serverless handler error:', err);
        res.status(500).send('Internal Server Error');
    }
}
//# sourceMappingURL=serverless.js.map