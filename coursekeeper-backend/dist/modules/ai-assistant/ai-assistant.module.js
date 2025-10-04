"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantModule = void 0;
const common_1 = require("@nestjs/common");
const ai_assistant_service_1 = require("./application/services/ai-assistant.service");
const prisma_service_1 = require("../../prisma.service");
const ai_assistant_repository_prisma_1 = require("./infra/prisma/ai-assistant.repository.prisma");
const ai_assistant_controller_1 = require("./presentation/controllers/ai-assistant.controller");
const auth_module_1 = require("../auth/auth.module");
let AiAssistantModule = class AiAssistantModule {
};
exports.AiAssistantModule = AiAssistantModule;
exports.AiAssistantModule = AiAssistantModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => auth_module_1.AuthModule)],
        controllers: [ai_assistant_controller_1.AiAssistantController],
        providers: [
            ai_assistant_service_1.AiAssistantService,
            prisma_service_1.PrismaService,
            {
                provide: 'IAiAssistantRepository',
                useClass: ai_assistant_repository_prisma_1.AiAssistantRepositoryPrisma,
            },
        ],
        exports: [ai_assistant_service_1.AiAssistantService],
    })
], AiAssistantModule);
//# sourceMappingURL=ai-assistant.module.js.map