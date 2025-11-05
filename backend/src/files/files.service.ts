import { Injectable } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class FilesService {
  constructor(private readonly awsService: AwsService) {}

  async uploadFile(buffer: Buffer, originalName: string, mimeType: string) {
    return this.awsService.uploadFile(buffer, originalName, mimeType);
  }

  async getFileUrl(key: string) {
    return this.awsService.getSignedUrlFor(key);
  }
}
