import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateBucketCommand,
  GetObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class AwsService implements OnModuleInit {
  private s3: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const endpoint = this.configService.get<string>('LOCALSTACK_ENDPOINT');
    const accessKeyId =
      this.configService.get<string>('AWS_ACCESS_KEY_ID') ?? 'test';
    const secretAccessKey =
      this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ?? 'test';
    this.bucketName =
      this.configService.get<string>('S3_BUCKET') ?? 'my-local-bucket';

    this.s3 = new S3Client({
      region,
      endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
  async onModuleInit() {
    await this.ensureBucket();
  }

  private async ensureBucket() {
    try {
      await this.s3.send(new HeadBucketCommand({ Bucket: this.bucketName }));
    } catch {
      await this.s3.send(new CreateBucketCommand({ Bucket: this.bucketName }));
    }
  }
  async uploadFile(buffer: Buffer, originalName: string, mimeType: string) {
    const key = `${Date.now()}-${randomUUID()}-${originalName}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      }),
    );

    return {
      key,
      url: `${this.configService.get('LOCALSTACK_ENDPOINT')}/${this.bucketName}/${key}`,
    };
  }

  async getSignedUrlFor(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3, command, { expiresIn: 60 * 5 });
  }
}
