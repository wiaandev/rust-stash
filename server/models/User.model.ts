import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { MaterialModel } from './Material.model';

class MaterialReference {
  @prop({ ref: MaterialModel})
  public id!: Ref<typeof MaterialModel>;

  @prop({ default: 30 })
  public qty!: number;

  @prop({ required: true, default: false })
  public lowQty!: boolean;
}

class AuthChecker {
  @prop({ required: true })
  public question!: string;

  @prop({ required: true })
  public answer!: string;
}

export class User {
  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true, type: () => [AuthChecker] })
  public auth!: AuthChecker[];

  @prop({ require: true, default: false })
  public isAuth: boolean;

  @prop({ type: () => [MaterialReference], required: true })
  public userMaterials: MaterialReference[];
}

export const UserModel = getModelForClass(User);
