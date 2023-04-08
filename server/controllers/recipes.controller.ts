import { Request, Response } from 'express';
import { RecipeModel } from '../models/Recipe.model';
import * as fs from 'fs';
import path from 'path';
import { MaterialModel } from '../models/Material.model';

class RecipeController {
  async getAllRecipes(req: Request, res: Response) {
    try {

      const recipes = await RecipeModel.find()
        .populate({
            path: 'ingredients.inventoryId',
            model: MaterialModel,
            select: ['name', 'qty', 'img'],
        });

        console.log(recipes);

      if (!recipes) {
        res.status(404).send({ msg: 'Recipes could not be found' });
      }
      return res.send(recipes);
    } catch (err) {
      return res.status(500).send({ error: err });
    }
  }

  async addRecipe(req: Request, res: Response) {
    try {
      //   const {  name, categories, ingredients, recipeImg } = req.body;

      const filePath = path.resolve(__dirname, '../models/recipes.json');
      console.log('Absolute file path:', filePath);

      const recipesJson = fs.readFileSync('../models/recipes.json', 'utf-8');
      const data = JSON.parse(recipesJson);

      const recipe = await RecipeModel.insertMany(data);

      console.log('Inserted Recipe', recipe);
      //   const recipe = await RecipeModel.create({
      //     name,
      //     categories,
      //     ingredients,
      //     recipeImg,
      //   });

      if (!recipe) {
        res.status(400).send({ msg: 'Cannot Create Recipe!' });
      }

      return res.status(201).send(recipe);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: err });
    }
  }

  //   TODO: Add locationId as param.
  //   TODO: Minimise qty of inventory of location.
  //   TODO: Insert crafted item into inventory.
  async craftRecipe(req: Request, res: Response) {
    const { locationId } = req.params;
  }
}

export { RecipeController };
