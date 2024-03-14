import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from 'src/users/user.entity';
import { MessagePattern } from '@nestjs/microservices';
import { log } from 'console';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    // @Post('login')
    // async login(@Body() body: any, @Res() res: Response) {
    //     const {username, password} = body;
    //     const token = await this.authService.login(username, password);
    //     if(token){
    //         await this.authService.signCookie(res,token);
    //         return res.status(HttpStatus.OK).json({
    //             message: 'Login successful',
    //             token: token
    //         }); 
    //     }else{
    //         return res.status(HttpStatus.UNAUTHORIZED).json({
    //             message: 'Invalid credentials'
    //         });
    //     }
    // }
    @MessagePattern({cmd: 'login'})
    async loginPing(data : any) {
        const {username, password} = data;
        const token = await this.authService.login(username, password);
        if(token){
            return {
                message: 'Login successful',
                token: token
            }; 
        }else{
            return {
                message: 'Invalid credentials'
            };
        }
    }
    @Post('logout')
    async logout(@Res() res: Response) {
        return this.authService.logout(res);
    }
    // @Post('register')
    // async register(@Body() user: User, @Res() res: Response) {
    //     const newUser = await this.authService.register(user);
    //     if(newUser.result){
    //         return res.status(HttpStatus.OK).json({
    //             message: newUser.message,
    //         });
    //     }else{
    //         return res.status(HttpStatus.BAD_REQUEST).json({
    //             message: newUser.message
    //         });
    //     }
    // }
    @MessagePattern({cmd: 'register'})
    async register(data: User) {
        const newUser = await this.authService.register(data);
        if(newUser.result){
            return {
                message: newUser.message,
            };
        }else{
            return {
                message: newUser.message
            };
        }
    }
}   