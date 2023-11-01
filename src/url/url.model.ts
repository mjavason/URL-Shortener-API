import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class URL extends Document {
  @Prop({ required: true })
  original_url: string;

  @Prop({ required: true, unique: true })
  short_code: string;

  @Prop({ type: Date, default: null })
  expires_at: Date;

  @Prop({ default: 0 })
  click_count: number;

  @Prop({ default: false, required: false, select: false })
  deleted: boolean;
}

export const URLSchema = SchemaFactory.createForClass(URL);
