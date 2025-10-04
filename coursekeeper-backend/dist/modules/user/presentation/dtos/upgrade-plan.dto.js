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
exports.UpgradePlanDto = exports.SubscriptionPlanEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const plan_duration_enum_1 = require("../../domain/enums/plan-duration.enum");
var SubscriptionPlanEnum;
(function (SubscriptionPlanEnum) {
    SubscriptionPlanEnum["FREE"] = "FREE";
    SubscriptionPlanEnum["GOLD"] = "GOLD";
    SubscriptionPlanEnum["PLATINUM"] = "PLATINUM";
})(SubscriptionPlanEnum || (exports.SubscriptionPlanEnum = SubscriptionPlanEnum = {}));
class UpgradePlanDto {
    subscriptionPlan;
    type;
}
exports.UpgradePlanDto = UpgradePlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: SubscriptionPlanEnum }),
    (0, class_validator_1.IsEnum)(SubscriptionPlanEnum),
    __metadata("design:type", String)
], UpgradePlanDto.prototype, "subscriptionPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plan_duration_enum_1.PlanDuration }),
    (0, class_validator_1.IsEnum)(plan_duration_enum_1.PlanDuration, { message: 'Tipo deve ser monthly ou annual' }),
    __metadata("design:type", String)
], UpgradePlanDto.prototype, "type", void 0);
//# sourceMappingURL=upgrade-plan.dto.js.map