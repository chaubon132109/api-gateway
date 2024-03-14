import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDocument, File } from '../schema/file.schema';
import { copyFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { log } from 'console';

@Injectable()
export class FileService {
  private readonly uploadFolder = './uploads';

  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async uploadFile(file: Express.Multer.File): Promise<File> {
    try {
      
      const filePath = join(this.uploadFolder, file.filename);
      // copyFileSync(file.path, filePath);

      const newFile = new this.fileModel({
        name: file.originalname,
        path: filePath,
        mimeType: file.mimetype,
      });
      return newFile.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteFile(id: string): Promise<{ message: string }> {
    const deletedFile = await this.fileModel.findByIdAndDelete(id);
    if (!deletedFile) {
      return { message: `File with id ${id} not found` };
    }

    const filePath = deletedFile.path;
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }

    return { message: `File with id ${id} has been deleted` };
  }
  async findAll(): Promise<File[]> {
    const files = await this.fileModel.find({
    });
    return files;
  }
  async findFile(name: string, format: string): Promise<File[]> {
    let query: any = {
      name: new RegExp(name, 'i')
    };
    if (format) {
      const regex = new RegExp(`^.*\\.${format}$`, 'i');
      query.path = regex;
    }
    const files = await this.fileModel.find(query);
    return files;
  }

}