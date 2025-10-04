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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ai_assistant_service_1 = require("../../application/services/ai-assistant.service");
const ai_assistant_dto_1 = require("../dto/ai-assistant.dto");
const passport_1 = require("@nestjs/passport");
let AiAssistantController = class AiAssistantController {
    aiAssistantService;
    constructor(aiAssistantService) {
        this.aiAssistantService = aiAssistantService;
    }
    async chat(body) {
        const response = await this.aiAssistantService.chatWithUser(body.userId, body.message);
        return { response };
    }
};
exports.AiAssistantController = AiAssistantController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Chat with AI Assistant' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('chat'),
    (0, swagger_1.ApiBody)({ type: ai_assistant_dto_1.ChatDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_assistant_dto_1.ChatDto]),
    __metadata("design:returntype", Promise)
], AiAssistantController.prototype, "chat", null);
exports.AiAssistantController = AiAssistantController = __decorate([
    (0, swagger_1.ApiTags)('AI Assistant'),
    (0, common_1.Controller)('ai-assistant'),
    __metadata("design:paramtypes", [ai_assistant_service_1.AiAssistantService])
], AiAssistantController);
//# sourceMappingURL=ai-assistant.controller.js.map