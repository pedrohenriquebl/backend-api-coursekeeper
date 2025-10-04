"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Courses = void 0;
class Courses {
    id;
    name;
    description;
    createdAt;
    updatedAt;
    deletedAt;
    platform;
    platformCustom;
    duration;
    studiedHours;
    topic;
    topicCustom;
    language;
    languageCustom;
    progress;
    rating;
    comment;
    status;
    startDate;
    endDate;
    instructor;
    userId;
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
        this.platform = data.platform;
        this.platformCustom = data.platformCustom;
        this.duration = data.duration;
        this.studiedHours = data.studiedHours;
        this.topic = data.topic;
        this.topicCustom = data.topicCustom;
        this.language = data.language;
        this.languageCustom = data.languageCustom;
        this.progress = data.progress;
        this.rating = data.rating;
        this.comment = data.comment;
        this.status = data.status;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.instructor = data.instructor;
        this.userId = data.userId;
    }
}
exports.Courses = Courses;
//# sourceMappingURL=courses.entity.js.map