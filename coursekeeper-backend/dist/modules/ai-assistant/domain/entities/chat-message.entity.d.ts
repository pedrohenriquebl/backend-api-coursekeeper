import { ChatRole } from "@prisma/client";
export declare class ChatMessage {
    id?: number;
    userId: number;
    role: ChatRole;
    message: string;
    createdAt?: Date;
    constructor(userId: number, role: ChatRole, message: string, createdAt?: Date, id?: number);
}
