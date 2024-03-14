import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { loginDTO } from 'src/dto/login.dto';
import { registerDTO } from 'src/dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor (    
        @Inject('USER_SERVICE') private readonly userClient : ClientProxy,
    ){}
    @Post('login')
    async login(@Body() user: loginDTO) {
      return await this.userClient.send({cmd : 'login'},user);
    }
    @Post('register')
    async register(@Body() user: registerDTO) {
      return await this.userClient.send({cmd :'register'},user);
    }
}
