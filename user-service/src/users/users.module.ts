  import { Global, Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { UsersService } from './users.service';
  import { UsersController } from './users.controller';
  import { User } from './user.entity';
  import { JwtModule } from '@nestjs/jwt';
  import { ConfigModule, ConfigService } from '@nestjs/config';
  import { ClientsModule, Transport } from '@nestjs/microservices';
  @Global()
  @Module({
    imports: [TypeOrmModule.forFeature([User]),
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
    //     options :
    //       { 
    //         port: 3001,
    //         host: 'localhost'
    //       }
    //   }
    // ])
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
  })
  export class UsersModule {}