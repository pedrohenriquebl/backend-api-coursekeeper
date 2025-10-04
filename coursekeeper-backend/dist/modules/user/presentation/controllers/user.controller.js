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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../application/services/user.service");
const create_user_dto_1 = require("../dtos/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const update_user_dto_1 = require("../dtos/update-user.dto");
const login_user_dto_1 = require("../dtos/login-user.dto");
const auth_service_1 = require("../../../auth/auth.service");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const avatar_multer_1 = require("../../../../common/upload/avatar.multer");
const update_subscription_dto_1 = require("../dtos/update-subscription.dto");
const upgrade_plan_dto_1 = require("../dtos/upgrade-plan.dto");
let UserController = class UserController {
    userService;
    authService;
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async createUser(dto) {
        return this.userService.createUser(dto);
    }
    async loginUser(loginDto) {
        const loginResult = await this.userService.login(loginDto);
        if (!loginResult) {
            throw new common_1.UnauthorizedException('Email or password is incorrect');
        }
        return loginResult;
    }
    async getMe(req) {
        const user = req.user;
        if (!user)
            throw new common_1.UnauthorizedException();
        const validatedUser = await this.userService.validateSubscription(user);
        const generalCoursesInfo = await this.userService.getCourseStats(Number(validatedUser.id));
        const goalsStats = await this.userService.getGoalsStats(Number(validatedUser.id));
        return {
            ...validatedUser,
            subscriptionPlan: validatedUser.subscriptionPlan || 'FREE',
            subscriptionValidUntil: validatedUser.subscriptionValidUntil || null,
            generalCoursesInfo,
            goalsStats,
        };
    }
    async uploadMyAvatar(file, req) {
        if (!file) {
            throw new common_1.BadRequestException('Arquivo é obrigatório');
        }
        const userId = String(req.user.id);
        const relativePath = `/public/avatars/${file.filename}`;
        const updated = await this.userService.updateUser(userId, {
            profileImage: relativePath,
        });
        return {
            path: relativePath,
            user: updated,
        };
    }
    async getUserById(id) {
        return this.userService.findById(id);
    }
    async updateUser(id, dto) {
        return this.userService.updateUser(id, dto);
    }
    async deleteUser(id) {
        return this.userService.softDeleteUser(id);
    }
    async updateSubscription(id, dto) {
        return this.userService.updateSubscription(Number(id), dto);
    }
    async upgradeSubscription(id, dto) {
        return this.userService.upgradePlan(id, dto.subscriptionPlan, dto.type);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login a user' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'User Information' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload avatar do usuário logado' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('me/avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', avatar_multer_1.avatarMulterOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadMyAvatar", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by ID' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a user by ID' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user by ID' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user subscription plan' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Put)(':id/subscription'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_subscription_dto_1.UpdateSubscriptionDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateSubscription", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('jwt-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Upgrade user subscription plan' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(':id/subscription/upgrade'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, upgrade_plan_dto_1.UpgradePlanDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "upgradeSubscription", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map