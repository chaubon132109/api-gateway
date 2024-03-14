import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private userClient:ClientProxy
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verify(
          token
        );
        request['user'] = payload;
        const check = await this.userClient.send({cmd:'findOne'},payload.id).toPromise();
        if(!check){
          throw new UnauthorizedException('Unable to find user');
        }
        if(!check.isActive){
          throw new UnauthorizedException('User is not active');
        }
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
}