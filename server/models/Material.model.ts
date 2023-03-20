import { prop, getModelForClass } from '@typegoose/typegoose';

class Material {
  @prop()
  public name!: string;

  @prop()
  public desc!: string;

  @prop({ type: () => [String] })
  public categories!: string[];

  @prop()
  public img!: string;

  @prop()
  public isCraftable!: boolean;
}

export const MaterialModel = getModelForClass(Material);
