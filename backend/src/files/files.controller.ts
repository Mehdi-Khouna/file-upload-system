import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // important for Swagger file upload
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.filesService.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
    return { key: result.key };
  }

  @Get(':key/url')
  async getFileUrl(@Param('key') key: string) {
    const url = await this.filesService.getFileUrl(key);
    return { url };
  }
}
