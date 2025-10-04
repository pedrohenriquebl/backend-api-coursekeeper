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
exports.CreateCourseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateCourseDto {
    name;
    description;
    platform;
    platformCustom;
    duration;
    studiedHours;
    topic;
    topicCustom;
    language;
    languageCustom;
    rating;
    comment;
    status;
    startDate;
    endDate;
    instructor;
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(client_1.Platform),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCourseDto.prototype, "platformCustom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "studiedHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(client_1.Topic),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCourseDto.prototype, "topicCustom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(client_1.Language),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCourseDto.prototype, "languageCustom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCourseDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ readOnly: true }),
    (0, class_validator_1.IsEnum)(client_1.CourseStatus),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCourseDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCourseDto.prototype, "instructor", void 0);
//# sourceMappingURL=create-course.dto.js.map