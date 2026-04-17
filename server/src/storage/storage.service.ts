import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import sharp from 'sharp';

@Injectable()
export class StorageService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('cloudinary.cloudName'),
      api_key: this.configService.get<string>('cloudinary.apiKey'),
      api_secret: this.configService.get<string>('cloudinary.apiSecret'),
    });
  }

  async upload(buffer: Buffer): Promise<{ url: string; publicId: string }> {
    const webpBuffer = await sharp(buffer)
      .resize(600, 600, { fit: 'cover' })
      .webp({ quality: 60, effort: 6 })
      .toBuffer();

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'uploads', resource_type: 'image' },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error || !result) return reject(error ?? new BadRequestException('Upload failed'));
          resolve({ url: result.secure_url, publicId: result.public_id });
        },
      );
      stream.end(webpBuffer);
    });
  }

  async deleteByUrl(url: string): Promise<void> {
    if (!url) return;
    const afterUpload = url.split('/upload/')[1];
    if (!afterUpload) return;
    const withoutVersion = afterUpload.replace(/^v\d+\//, '');
    const publicId = withoutVersion.replace(/\.[^/.]+$/, '');
    await cloudinary.uploader.destroy(publicId);
  }
}
