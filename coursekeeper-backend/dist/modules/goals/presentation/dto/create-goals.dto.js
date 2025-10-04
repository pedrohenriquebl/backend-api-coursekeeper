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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGoalDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class CreateGoalDto {
    title;
    type;
    topic;
    target;
    unit;
    deadline;
    description;
}
exports.CreateGoalDto = CreateGoalDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGoalDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(client_1.GoalType),
    __metadata("design:type", String)
], CreateGoalDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true, enum: client_1.Topic }),
    (0, class_validator_1.ValidateIf)((o) => o.type === 'HORAS_TOPICO'),
    (0, class_validator_1.IsEnum)(client_1.Topic),
    __metadata("design:type", Object)
], CreateGoalDto.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateGoalDto.prototype, "target", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(client_1.GoalUnits),
    __metadata("design:type", String)
], CreateGoalDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateGoalDto.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateGoalDto.prototype, "description", void 0);
//# sourceMappingURL=create-goals.dto.js.map