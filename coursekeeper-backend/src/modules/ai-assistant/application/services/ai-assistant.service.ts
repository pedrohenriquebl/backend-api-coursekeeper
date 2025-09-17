import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import OpenAI from 'openai';
import { ChatRole } from '@prisma/client';
import type { ChatCompletionMessageParam } from 'openai/resources';
import { ChatMessage } from '../../domain/entities/chat-message.entity';
import type { IAiAssistantRepository } from '../../domain/repositories/ai-assistant.repository';

@Injectable()
export class AiAssistantService {
  private readonly openai: OpenAI;
  private readonly MAX_TOKENS = 1000;
  private readonly logger = new Logger(AiAssistantService.name);

  constructor(
    private prisma: PrismaService,
    @Inject('IAiAssistantRepository')
    private readonly aiRepo: IAiAssistantRepository,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chatWithUser(userId: number, message: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('Usuário não encontrado');

    const userName = `${user.firstName} ${user.lastName}`;

    const [userCourses, goals, achievements] = await Promise.all([
      this.prisma.course.findMany({
        where: { userId },
        select: { name: true, progress: true, status: true },
      }),
      this.prisma.goal.findMany({
        where: { userId, isActive: true },
        select: { title: true, type: true, current: true, target: true, unit: true },
      }),
      this.prisma.userAchievement.findMany({
        where: { userId },
        select: { achievement: { select: { name: true } } },
      }),
    ]);

    const coursesText = userCourses.length
      ? userCourses.map(c => `- ${c.name} | Progresso: ${c.progress}% | Status: ${c.status}`).join('\n')
      : 'Nenhum curso cadastrado';

    const goalsText = goals.length
      ? goals.map(g => `- ${g.title}: ${g.current}/${g.target} ${g.unit}`).join('\n')
      : 'Nenhuma meta ativa';

    const achievementsText = achievements.length
      ? achievements.map(a => `- ${a.achievement.name}`).join('\n')
      : 'Nenhuma conquista desbloqueada';

    const recentMessages = await this.aiRepo.getRecentMessages(userId, 10);

    const messagesForOpenAI: ChatCompletionMessageParam[] = [
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
      ...recentMessages.map(m => ({
        role: m.role === ChatRole.USER ? 'user' : 'assistant',
        content: m.message,
      })),
      { role: 'user', content: message },
    ] as ChatCompletionMessageParam[];

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messagesForOpenAI,
        max_tokens: this.MAX_TOKENS,
      });

      const response = completion.choices[0].message?.content || '';

      await Promise.all([
        this.aiRepo.saveMessage(new ChatMessage(userId, ChatRole.USER, message)),
        this.aiRepo.saveMessage(new ChatMessage(userId, ChatRole.ASSISTANT, response)),
      ]);

      return response;
    } catch (error) {
      this.logger.error('Erro ao chamar OpenAI', error);
      return 'Desculpe, ocorreu um erro ao gerar a resposta. Tente novamente mais tarde.';
    }
  }
}
