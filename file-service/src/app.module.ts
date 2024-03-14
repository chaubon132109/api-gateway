import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './schema/file.schema';

@Module({
  imports: [FileModule,MongooseModule.forRoot('mongodb://localhost:27017/file-service'),
        MongooseModule.forFeature([{ name: File.name, schema: FileSchema }])
  ],
  controllers: [AppController, FileController],
  providers: [AppService, FileService],
})
export class AppModule {}
