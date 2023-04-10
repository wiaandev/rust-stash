import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

class InventoryDetails {
  @prop({
    _id: false,
    type: () => Schema.Types.ObjectId, // added [] to define an array of ObjectIds
  })
  materialId!: Schema.Types.ObjectId;

  @prop()
  qty!: number;
}

class Location {
  @prop()
  public name!: string;
  @prop()
  public address!: string;
  @prop()
  public img!: string;
  @prop({ _id: false, type: () => [InventoryDetails] })
  public locationItems!: InventoryDetails[];
  @prop({ type: () => Schema.Types.ObjectId }) 
  public materialId!: Schema.Types.ObjectId;
}

export const LocationModel = getModelForClass(Location);