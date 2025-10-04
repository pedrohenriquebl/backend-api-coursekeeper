"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarMulterOptions = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const fs_1 = require("fs");
const path_1 = require("path");
exports.avatarMulterOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const uploadPath = (0, path_1.join)(process.cwd(), 'public', 'avatars');
            if (!(0, fs_1.existsSync)(uploadPath)) {
                (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const userId = req.user?.id ?? 'anon';
            const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${userId}-${unique}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!/^image\/(png|jpe?g|webp|gif)$/.test(file.mimetype)) {
            return cb(new common_1.BadRequestException('Tipo de arquivo não suportado'), false);
        }
        cb(null, true);
    },
};
//# sourceMappingURL=avatar.multer.js.map