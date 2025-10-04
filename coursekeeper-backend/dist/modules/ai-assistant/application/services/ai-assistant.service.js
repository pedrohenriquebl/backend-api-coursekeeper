"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AiAssistantService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma.service");
const openai_1 = __importDefault(require("openai"));
const client_1 = require("@prisma/client");
const chat_message_entity_1 = require("../../domain/entities/chat-message.entity");
let AiAssistantService = AiAssistantService_1 = class AiAssistantService {
    prisma;
    aiRepo;
    openai;
    MAX_TOKENS = 1000;
    logger = new common_1.Logger(AiAssistantService_1.name);
    constructor(prisma, aiRepo) {
        this.prisma = prisma;
        this.aiRepo = aiRepo;
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async chatWithUser(userId, message) {
        const user = await this.prisma.client.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            throw new Error('Usuário não encontrado');
        const userName = `${user.firstName} ${user.lastName}`;
        const [userCourses, goals, achievements] = await Promise.all([
            this.prisma.client.course.findMany({
                where: { userId },
                select: { name: true, progress: true, status: true },
            }),
            this.prisma.client.goal.findMany({
                where: { userId, isActive: true },
                select: {
                    title: true,
                    type: true,
                    current: true,
                    target: true,
                    unit: true,
                },
            }),
            this.prisma.client.userAchievement.findMany({
                where: { userId },
                select: { achievement: { select: { name: true } } },
            }),
        ]);
        const coursesText = userCourses.length
            ? userCourses
                .map((c) => `- ${c.name} | Progresso: ${c.progress}% | Status: ${c.status}`)
                .join('\n')
            : 'Nenhum curso cadastrado';
        const goalsText = goals.length
            ? goals
                .map((g) => `- ${g.title}: ${g.current}/${g.target} ${g.unit}`)
                .join('\n')
            : 'Nenhuma meta ativa';
        const achievementsText = achievements.length
            ? achievements.map((a) => `- ${a.achievement.name}`).join('\n')
            : 'Nenhuma conquista desbloqueada';
        const recentMessages = await this.aiRepo.getRecentMessages(userId, 10);
        const messagesForOpenAI = [
            {
                role: 'system',
                content: `
          Você é um assistente educacional chamado CourseKeeper IA.
          Responda de forma amigável, direta e útil, **somente nesta mensagem**.
          Não diga que irá enviar outra mensagem depois ou que o usuário deve aguardar.
          Não faça suposições sobre o usuário e use apenas as informações fornecidas no contexto e histórico resumido.
        `,
            },
            {
                role: 'user',
                content: `
          --- INFORMAÇÕES DO USUÁRIO ---
          Nome: ${userName}

          --- CURSOS CADASTRADOS ---
          ${coursesText}

          --- METAS ATIVAS ---
          ${goalsText}

          --- CONQUISTAS DESBLOQUEADAS ---
          ${achievementsText}
        `,
            },
            ...recentMessages.map((m) => ({
                role: m.role === client_1.ChatRole.USER ? 'user' : 'assistant',
                content: m.message,
            })),
            { role: 'user', content: message },
        ];
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messagesForOpenAI,
                max_tokens: this.MAX_TOKENS,
            });
            const response = completion.choices[0].message?.content || '';
            await Promise.all([
                this.aiRepo.saveMessage(new chat_message_entity_1.ChatMessage(userId, client_1.ChatRole.USER, message)),
                this.aiRepo.saveMessage(new chat_message_entity_1.ChatMessage(userId, client_1.ChatRole.ASSISTANT, response)),
            ]);
            return response;
        }
        catch (error) {
            this.logger.error('Erro ao chamar OpenAI', error);
            return 'Desculpe, ocorreu um erro ao gerar a resposta. Tente novamente mais tarde.';
        }
    }
};
exports.AiAssistantService = AiAssistantService;
exports.AiAssistantService = AiAssistantService = AiAssistantService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('IAiAssistantRepository')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], AiAssistantService);
//# sourceMappingURL=ai-assistant.service.js.map