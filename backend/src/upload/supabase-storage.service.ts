import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseStorageService {
  private supabase: SupabaseClient;
  private bucketName = 'product-images';

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not found in environment variables');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
  }

  /**
   * Faz upload de um arquivo para o Supabase Storage
   * @param file Buffer do arquivo
   * @param filename Nome do arquivo
   * @returns URL pública do arquivo
   */
  async uploadFile(file: Buffer, filename: string): Promise<string> {
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(filename, file, {
        contentType: 'image/jpeg', // Ajustar conforme o tipo
        upsert: true, // Sobrescrever se já existir
      });

    if (error) {
      throw new Error(`Erro ao fazer upload: ${error.message}`);
    }

    // Retornar URL pública
    const { data: publicUrlData } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(filename);

    return publicUrlData.publicUrl;
  }

  /**
   * Faz upload de múltiplos arquivos
   * @param files Array de { buffer: Buffer, filename: string }
   * @returns Array de URLs públicas
   */
  async uploadMultipleFiles(
    files: Array<{ buffer: Buffer; filename: string }>,
  ): Promise<string[]> {
    const uploadPromises = files.map((file) =>
      this.uploadFile(file.buffer, file.filename),
    );

    return Promise.all(uploadPromises);
  }

  /**
   * Deleta um arquivo do Supabase Storage
   * @param filename Nome do arquivo
   */
  async deleteFile(filename: string): Promise<void> {
    const { error } = await this.supabase.storage
      .from(this.bucketName)
      .remove([filename]);

    if (error) {
      throw new Error(`Erro ao deletar arquivo: ${error.message}`);
    }
  }

  /**
   * Retorna a URL pública de um arquivo
   * @param filename Nome do arquivo
   * @returns URL pública
   */
  getPublicUrl(filename: string): string {
    const { data } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(filename);

    return data.publicUrl;
  }
}
