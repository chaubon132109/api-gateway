import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  mimeType: string;
  
  @Prop({ required: true })
  userid: number;
}

export const FileSchema = SchemaFactory.createForClass(File);