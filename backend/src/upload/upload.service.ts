import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  async ensureUploadDir() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  getFilePath(filename: string): string {
    return path.join(this.uploadDir, filename);
  }

  getFileUrl(filename: string): string {
    // URL relativa que será servida pelo backend
    return `/uploads/${filename}`;
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = this.getFilePath(filename);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Error deleting file ${filename}:`, error);
    }
  }
}
