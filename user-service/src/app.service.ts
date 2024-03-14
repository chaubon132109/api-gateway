import { Inject, Injectable } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { log } from 'console';


let bookStore:BookDTO[] = []

@Injectable()
export class AppService {
  getHello(){
    return 'Hello World!';
  }
}