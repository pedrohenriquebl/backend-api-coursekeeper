import { ChatMessage } from '../entities/chat-message.entity';

export interface IAiAssistantRepository {
  saveMessage(message: ChatMessage): Promise<ChatMessage>;
  getRecentMessages(userId: number, limit: number): Promise<ChatMessage[]>;
  getAllMessages(userId: number): Promise<ChatMessage[]>;
}
