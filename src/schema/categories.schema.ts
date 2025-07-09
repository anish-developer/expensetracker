import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Categories & Document;

@Schema()
export class Categories {
  @Prop({ required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Categories);
