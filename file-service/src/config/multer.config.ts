import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

// Tạo thư mục uploads nếu chưa tồn tại
const uploadFolder = './uploads';
if (!existsSync(uploadFolder)) {
  mkdirSync(uploadFolder);
}

// Cấu hình multer
export const multerConfig = {
  dest: uploadFolder,
  limits: {
    fileSize: 4 * 1024 * 1024, 
  },
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      const fileExtension = extname(file.originalname);
      const fileName = `${Date.now()}${fileExtension}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|JPEG|png|gif|pdf)$/)) {
      return cb(
        new HttpException(
          'Only image and PDF files are allowed!',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
    cb(null, true);
  },
};