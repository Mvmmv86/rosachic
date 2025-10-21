import { Injectable } from '@nestjs/common';
import { SupabaseStorageService } from './supabase-storage.service';

@Injectable()
export class UploadService {
  constructor(private supabaseStorage: SupabaseStorageService) {}

  /**
   * Faz upload de arquivo para Supabase Storage
   * @param buffer Buffer do arquivo
   * @param filename Nome do arquivo
   * @returns URL pública do arquivo no Supabase
   */
  async uploadFile(buffer: Buffer, filename: string): Promise<string> {
    return this.supabaseStorage.uploadFile(buffer, filename);
  }

  /**
   * Faz upload de múltiplos arquivos
   * @param files Array de arquivos
   * @returns Array de URLs públicas
   */
  async uploadMultipleFiles(
    files: Array<{ buffer: Buffer; filename: string }>,
  ): Promise<string[]> {
    return this.supabaseStorage.uploadMultipleFiles(files);
  }

  /**
   * Retorna URL pública de um arquivo
   * @param filename Nome do arquivo
   * @returns URL pública completa do Supabase
   */
  getFileUrl(filename: string): string {
    return this.supabaseStorage.getPublicUrl(filename);
  }

  /**
   * Deleta arquivo do Supabase Storage
   * @param filename Nome do arquivo
   */
  async deleteFile(filename: string): Promise<void> {
    await this.supabaseStorage.deleteFile(filename);
  }
}
