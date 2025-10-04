"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalProgressUpdatedEvent = void 0;
class GoalProgressUpdatedEvent {
    userId;
    studiedHoursDiff;
    topic;
    courseStatus;
    constructor(userId, studiedHoursDiff, topic, courseStatus) {
        this.userId = userId;
        this.studiedHoursDiff = studiedHoursDiff;
        this.topic = topic;
        this.courseStatus = courseStatus;
    }
}
exports.GoalProgressUpdatedEvent = GoalProgressUpdatedEvent;
//# sourceMappingURL=goal-progress-updated.event.js.map