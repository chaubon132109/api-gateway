import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.gaurd';
import { JwtStrategy } from './jwt.strategy';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    UsersModule,ConfigModule,
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
    // ClientsModule.register([
    //   {
    //     name : 'FILE_SERVICE',
    //     transport : Transport.TCP,
    //   }
    // ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthGuard]
})
export class AuthModule {}