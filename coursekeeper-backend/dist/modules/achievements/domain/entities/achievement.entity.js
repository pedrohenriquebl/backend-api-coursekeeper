"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Achievement = void 0;
class Achievement {
    id;
    code;
    name;
    description;
    icon;
    condition;
    constructor(id, code, name, description, icon, condition) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.condition = condition;
    }
}
exports.Achievement = Achievement;
//# sourceMappingURL=achievement.entity.js.map