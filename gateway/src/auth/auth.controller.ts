import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { loginDTO } from 'src/dto/login.dto';
import { registerDTO } from 'src/dto/register.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor (    
        @Inject('USER_SERVICE') private readonly userClient : ClientProxy,
    ){}
    @Post('login')
    @ApiOperation(
      {
        summary : 'Login',
        description : 'Đăng nhập',
      }
    )
    @ApiResponse(
        {
          status : 200,
          description : 'Đăng nhập thành công',
        }
    )
    async login(@Body() user: loginDTO) {
      return await this.userClient.send({cmd : 'login'},user);
    }
    @Post('register')
    async register(@Body() user: registerDTO) {
      return await this.userClient.send({cmd :'register'},user);
    }
}
