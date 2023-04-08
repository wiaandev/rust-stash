import { AuthModel } from "./Auth.model";
import { IngredientModel } from "./Ingredient.model";

export class RecipeModel {
    public name: string;
    public categories: string[];
    public ingredients: IngredientModel[];
    public recipeImg: string;
  
    constructor(
      name: string,
      categories: string[],
      ingredients: IngredientModel[],
      recipeImg: string
    ) {
      this.name = name;
      this.categories = categories;
      this.ingredients = ingredients;
      this.recipeImg = recipeImg;
    }
  }
  