import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    @Inject('USER_SERVICE') private readonly userClient : ClientProxy,
    @Inject('FILE_SERVICE') private readonly fileClient : ClientProxy
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('ping/file')
  @ApiTags('ping')
  getPingFile() {
    return this.fileClient.send({cmd : 'ping'},'test ping file-service');
  }
  @Get('ping/user')
  @ApiTags('ping')
  getPingUser() {
    return this.userClient.send({cmd : 'ping'},'test ping user-service');
  }
  
}
