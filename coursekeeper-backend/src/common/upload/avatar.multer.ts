import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';

export const avatarMulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = join(process.cwd(), 'public', 'avatars');
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req: any, file, cb) => {
      const userId = req.user?.id ?? 'anon';
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${userId}-${unique}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: Function) => {
    if (!/^image\/(png|jpe?g|webp|gif)$/.test(file.mimetype)) {
      return cb(new BadRequestException('Tipo de arquivo não suportado'), false);
    }
    cb(null, true);
  },
};
