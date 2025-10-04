"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = void 0;
class ChatMessage {
    id;
    userId;
    role;
    message;
    createdAt;
    constructor(userId, role, message, createdAt, id) {
        this.userId = userId;
        this.role = role;
        this.message = message;
        this.createdAt = createdAt;
        this.id = id;
    }
}
exports.ChatMessage = ChatMessage;
//# sourceMappingURL=chat-message.entity.js.map