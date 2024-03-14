import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from './auth.gaurd';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
    imports : [
        ConfigModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: '6000s',
            },
          }),
        }),
        ClientsModule.register([
            {
              name : 'USER_SERVICE',
              transport : Transport.TCP,
              options :
                { 
                  port: 3002,
                  host: '10.1.56.154',
                }
            }])
      ],
      controllers: [AuthController],
      providers: [JwtStrategy, AuthGuard]
})
export class AuthModule {}
