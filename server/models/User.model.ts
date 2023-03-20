import {prop, getModelForClass, pre} from '@typegoose/typegoose';
import { Schema } from 'mongoose';


class MaterialReference{
    @prop({ required: true,  _id: false })
    public id!: Schema.Types.ObjectId;
  
    @prop({ required: true, default: 0 })
    public qty!: number;

    @prop({required: true, default: true})
    public lowQty!: boolean;
}

export class User{
    @prop({required: true, unique: true})
    public email: string;

    @prop({require: true, default: false})
    public isAuth: boolean

    @prop({required: true, type: () => [MaterialReference]})
    public userMaterials: MaterialReference[];
}

export const MaterialModel = getModelForClass(User);



