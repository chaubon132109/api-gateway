import {Controller,Get,Query,UploadedFile,UseInterceptors,Post, Inject, UseGuards,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';
import { log } from 'console';
import { ClientProxy } from '@nestjs/microservices';
import { existsSync, mkdirSync } from 'fs';
import { AuthGuard } from 'src/auth/auth.gaurd';
@UseGuards(AuthGuard)
@Controller('files')
export class FilesController {
    private readonly uploadFolder = './uploads';
    constructor(@Inject('FILE_SERVICE') private readonly fileClient:ClientProxy){}
    @Post('upload')
    @UseInterceptors(FileInterceptor('file',multerConfig))
    uploadFile(@UploadedFile() file: Express.Multer.File){
        if (!existsSync(this.uploadFolder)) {
            mkdirSync(this.uploadFolder, {
                recursive: true
            });
          }
        return this.fileClient.send({cmd:'uploadFile'},file);
    }
    @Get()
    findAll(){
        return this.fileClient.send({cmd : 'findAll'},'find');
    }
    @Get('search')
    searchFile(@Query('name') name: string,@Query('format') format: string,){
        return this.fileClient.send({cmd:'searchFile'},{name, format});
    }
}
