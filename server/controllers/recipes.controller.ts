import { Request, Response } from 'express';
import { RecipeModel } from '../models/Recipe.model';
import * as fs from 'fs';
import path from 'path';
import { MaterialModel } from '../models/Material.model';
import { LocationModel } from '../models/Location.model';

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

      const recipesJson = fs.readFileSync('/Users/wiaanduvenhage/Desktop/Final Year/Term 1/Dev/rust-stash/server/models/recipes.json', 'utf-8');
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

  async compareMaterials(req: Request, res: Response){
    try {
      // find the location that is filtered and returns its materials
      const locationId = req.params.locationId;
      const recipeId = req.params.recipeId;
      console.log(locationId);

      const location = await LocationModel.findById(locationId);

      if (!location) {
        console.log('Cannot find location' + location);
        return res
          .status(404)
          .send(`Could not find location with ID ${locationId}`);
      }

      const locationPop = await LocationModel.findById(locationId).populate({
        path: 'locationItems.materialId',
        populate: {
          path: 'name',
          select: 'name',
        },
        model: MaterialModel,
      });

      const recipes = await RecipeModel.findById(recipeId);

      if(!recipes){
        console.log('Cannot find recipe: ' + recipes);
        return res.status(404).send(404).send(`Could not find recipe with ID ${recipeId}`);
      }

      console.log(recipes);

      let canCraft = false;

      for(const ingredient of recipes.ingredients){
        const material = locationPop?.locationItems.find(item => {
          return item.materialId === ingredient.inventoryId;
        })
        console.log(material);
        if(!material || material.qty < ingredient.requiredAmount){
          canCraft = false;
          break;
        }else{
          canCraft = true;
        }
      }

      if(canCraft){
        res.send(`You can craft ${recipes.name}`)
      } else {
        res.send(`You cannot craft ${recipes.name}`)
      }

      return res.send(recipes);

    } catch (error) {
      console.log(error);
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
