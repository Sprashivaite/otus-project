import { Controller } from '@nestjs/common';
import { FilesService } from './files.service';
import { GrpcMethod } from '@nestjs/microservices';
import { FileInfo, FileUpload } from 'src/proto/files';

@Controller()
export class FilesController {
  constructor(private filesService: FilesService) {}
  @GrpcMethod('FilesService', 'UploadFile')
  async uploadedFile({ content, filename, userId }: FileUpload) {
    this.filesService.uploadedFile(content, userId, filename);
    return {
      filename: userId + filename,
    };
  }
  @GrpcMethod('FilesService', 'GetImage')
  async getImage({ filename }: FileInfo) {
    const file = await this.filesService.getFile(filename);
    return {
      content: file,
    };
  }
}
