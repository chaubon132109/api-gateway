import {
Controller,
    Get,
Post,
Query,
UploadedFile,
UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { multerConfig } from '../config/multer.config';
import { log } from 'console';
import { MessagePattern } from '@nestjs/microservices';
  
  @Controller('file')
  export class FileController {
    constructor(private readonly fileService: FileService) {}
    @MessagePattern({cmd: 'findAll'})
    getHello(){
        return this.fileService.findAll();
    }
    @MessagePattern({cmd: 'uploadFile'})
    uploadFile(data : any) {
        const {file,userid} = data;
        return this.fileService.uploadFile(file, userid);
    }
    @MessagePattern({cmd: 'searchFile'})
    async findFile(data : any)
     {
        const {name, format} = data;
        const files = await this.fileService.findFile(name, format);
        return files;
    }
  }