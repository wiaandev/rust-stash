import { prop, getModelForClass } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

class Ingredients {

  @prop({_id: false})
  public inventoryId: Schema.Types.ObjectId;

  @prop()
  public requiredAmount!: number;

  @prop({default: false})
  public canCraft!: boolean;

}

class Recipe {
  @prop()
  public name!: string;

  @prop()
  public desc!: string;

  @prop({type: () => [String]})
  public categories!: string[];

  @prop({ type: () => [Ingredients] })
  public ingredients!: Ingredients[];

  @prop()
  public recipeImg!: string;
}

export const RecipeModel = getModelForClass(Recipe);
