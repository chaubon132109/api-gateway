import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
    constructor (    
        @Inject('USER_SERVICE') private readonly userClient : ClientProxy,
    ){}
    @Post('login')
    async login(@Body() user: any) {
      return await this.userClient.send({cmd : 'login'},user);
    }
    @Post('register')
    async register(@Body() user: any) {
      return await this.userClient.send({cmd :'register'},user);
    }
}
