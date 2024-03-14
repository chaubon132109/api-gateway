import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { FilesController } from './files/files.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name : 'FILE_SERVICE',
        transport : Transport.TCP,
        options :
          { 
            port: 3001,
            host: '10.1.56.154',
          }
    }]),
    ClientsModule.register([
    {
      name : 'USER_SERVICE',
      transport : Transport.TCP,
      options :
        { 
          port: 3002,
          host: '10.1.56.154',
        }
    }]),
    AuthModule,
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: 'daf49sj3k6af94cka64jllsjf846kjc96',
      signOptions: { expiresIn: '3600s' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FilesModule
  ],
  controllers: [AppController, AuthController, UserController,FilesController],
  providers: [AppService],
})
export class AppModule {}
