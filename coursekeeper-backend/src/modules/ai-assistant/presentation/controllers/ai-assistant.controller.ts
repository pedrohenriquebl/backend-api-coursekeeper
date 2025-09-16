import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AiAssistantService } from '../../application/services/ai-assistant.service';
import { ChatDto } from '../dto/ai-assistant.dto';

@ApiTags('AI Assistant')
@Controller('ai-assistant')
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Post('chat')
  @ApiBody({ type: ChatDto })
  async chat(@Body() body: ChatDto) {
    const response = await this.aiAssistantService.chatWithUser(
      body.userId,
      body.message,
    );
    return { response };
  }
}
