import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Validar tipo de arquivo
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      throw new BadRequestException('Only image files are allowed!');
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File size must be less than 5MB');
    }

    // Gerar nome único
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split('.').pop();
    const filename = `${file.fieldname}-${uniqueSuffix}.${ext}`;

    // Upload para Supabase
    const url = await this.uploadService.uploadFile(file.buffer, filename);

    return {
      message: 'Image uploaded successfully',
      filename: filename,
      url: url,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    // Validar cada arquivo
    for (const file of files) {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
        throw new BadRequestException('Only image files are allowed!');
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new BadRequestException('File size must be less than 5MB');
      }
    }

    // Preparar arquivos para upload
    const filesToUpload = files.map((file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = file.originalname.split('.').pop();
      const filename = `${file.fieldname}-${uniqueSuffix}.${ext}`;

      return {
        buffer: file.buffer,
        filename: filename,
      };
    });

    // Upload para Supabase
    const urls = await this.uploadService.uploadMultipleFiles(filesToUpload);

    // Retornar informações dos arquivos
    const uploadedFiles = filesToUpload.map((file, index) => ({
      filename: file.filename,
      url: urls[index],
      size: files[index].size,
      mimetype: files[index].mimetype,
    }));

    return {
      message: `${files.length} images uploaded successfully`,
      files: uploadedFiles,
    };
  }
}
