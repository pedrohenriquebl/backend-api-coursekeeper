import { AiAssistantService } from '../../application/services/ai-assistant.service';
import { ChatDto } from '../dto/ai-assistant.dto';
export declare class AiAssistantController {
    private readonly aiAssistantService;
    constructor(aiAssistantService: AiAssistantService);
    chat(body: ChatDto): Promise<{
        response: string;
    }>;
}
