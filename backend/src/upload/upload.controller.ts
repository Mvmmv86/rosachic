import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';

// Configuração do Multer
const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req: any, file: Express.Multer.File, callback: any) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
  fileFilter: (req: any, file: Express.Multer.File, callback: any) => {
    // Apenas imagens
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      return callback(
        new BadRequestException('Only image files are allowed!'),
        false,
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    await this.uploadService.ensureUploadDir();

    return {
      message: 'Image uploaded successfully',
      filename: file.filename,
      url: this.uploadService.getFileUrl(file.filename),
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    await this.uploadService.ensureUploadDir();

    const uploadedFiles = files.map((file) => ({
      filename: file.filename,
      url: this.uploadService.getFileUrl(file.filename),
      size: file.size,
      mimetype: file.mimetype,
    }));

    return {
      message: `${files.length} images uploaded successfully`,
      files: uploadedFiles,
    };
  }
}
