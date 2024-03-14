import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name : 'FILE_SERVICE',
  //       transport : Transport.TCP,
  //       options :
  //         { 
  //           port: 3002,
  //           host: '10.1.56.154',
  //         }
  //     }])
  // ],
  // controllers: [FilesController]
})
export class FilesModule {}
