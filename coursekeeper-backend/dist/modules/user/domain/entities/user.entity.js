"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    firstName;
    lastName;
    email;
    password;
    cpf;
    profileImage;
    description;
    createdAt;
    updatedAt;
    deletedAt;
    linkedin;
    github;
    website;
    currentLoginStreak;
    maxLoginStreak;
    lastLogin;
    subscriptionPlan;
    subscriptionValidUntil;
    acceptedTermsAt;
    acceptedPrivacyAt;
    constructor(id, firstName, lastName, email, password, cpf, profileImage, description, createdAt, updatedAt, deletedAt, linkedin, github, website, currentLoginStreak, maxLoginStreak, lastLogin, subscriptionPlan = 'FREE', subscriptionValidUntil, acceptedTermsAt, acceptedPrivacyAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
        this.profileImage = profileImage;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.linkedin = linkedin;
        this.github = github;
        this.website = website;
        this.currentLoginStreak = currentLoginStreak;
        this.maxLoginStreak = maxLoginStreak;
        this.lastLogin = lastLogin;
        this.subscriptionPlan = subscriptionPlan;
        this.subscriptionValidUntil = subscriptionValidUntil;
        this.acceptedTermsAt = acceptedTermsAt;
        this.acceptedPrivacyAt = acceptedPrivacyAt;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map