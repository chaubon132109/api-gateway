import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { log } from 'console';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  @MessagePattern({cmd: 'ping'})
  getPing(data : any) {
    log(data);
    return true;
  }
  
}