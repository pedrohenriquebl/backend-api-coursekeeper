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
exports.GoalProgressUpdatedHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const goal_progress_updated_event_1 = require("../../../courses/application/events/goal-progress-updated.event");
const goal_service_1 = require("../services/goal.service");
let GoalProgressUpdatedHandler = class GoalProgressUpdatedHandler {
    goalService;
    constructor(goalService) {
        this.goalService = goalService;
    }
    async handle(event) {
        await this.goalService.updateGoalProgress(event.userId, event.studiedHoursDiff, event.topic, event.courseStatus);
    }
};
exports.GoalProgressUpdatedHandler = GoalProgressUpdatedHandler;
exports.GoalProgressUpdatedHandler = GoalProgressUpdatedHandler = __decorate([
    (0, cqrs_1.EventsHandler)(goal_progress_updated_event_1.GoalProgressUpdatedEvent),
    __metadata("design:paramtypes", [goal_service_1.GoalService])
], GoalProgressUpdatedHandler);
//# sourceMappingURL=goal-progress-updated.handler.js.map