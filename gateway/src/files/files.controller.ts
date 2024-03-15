import {Controller,Get,Query,UploadedFile,UseInterceptors,Post, Inject, UseGuards, Req,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';
import { log } from 'console';
import { ClientProxy } from '@nestjs/microservices';
import { existsSync, mkdirSync } from 'fs';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { Request } from 'express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
@UseGuards(AuthGuard)
@Controller('files')
export class FilesController {
    private readonly uploadFolder = './uploads';
    constructor(@Inject('FILE_SERVICE') private readonly fileClient:ClientProxy){}
    @Post('upload')
    @ApiTags('files')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file',multerConfig))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Req() request: Request){
        const uploadFolder = './uploads';
        if (!existsSync(uploadFolder)) {
            mkdirSync(uploadFolder);
        }
        const userid = request['user'].id;
        return this.fileClient.send({cmd:'uploadFile'},{file:file, userid:userid});
    }
    @Get()
    @ApiTags('files')
    findAll(){
        return this.fileClient.send({cmd : 'findAll'},'find');
    }
    @Get('search')
    @ApiTags('files')
    searchFile(@Query('name') name: string,@Query('format') format: string,){
        return this.fileClient.send({cmd:'searchFile'},{name, format});
    }
}
