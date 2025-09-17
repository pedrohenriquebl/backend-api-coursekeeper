import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AiAssistantService } from '../../application/services/ai-assistant.service';
import { ChatDto } from '../dto/ai-assistant.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('AI Assistant')
@Controller('ai-assistant')
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Chat with AI Assistant' })
  @UseGuards(AuthGuard('jwt'))
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
