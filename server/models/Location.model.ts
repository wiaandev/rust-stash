import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

export class Location {
  @prop()
  public name!: string;
  @prop()
  public address!: string;
  @prop()
  public img!: string;
  @prop({ _id: false, type: () => [Schema.Types.ObjectId] })
  public locationItems!: Schema.Types.ObjectId[];
}

export const LocationModel = getModelForClass(Location);
