import { ChatRole } from "@prisma/client";

export class ChatMessage {
  id?: number;
  userId: number;
  role: ChatRole;
  message: string;
  createdAt?: Date;

  constructor(userId: number, role: ChatRole, message: string, createdAt?: Date, id?: number) {
    this.userId = userId;
    this.role = role;
    this.message = message;
    this.createdAt = createdAt;
    this.id = id;
  }
}
