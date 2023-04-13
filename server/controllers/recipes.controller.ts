import { Request, Response } from 'express';
import { RecipeModel } from '../models/Recipe.model';
import * as fs from 'fs';
import path from 'path';
import { MaterialModel } from '../models/Material.model';
import { LocationModel } from '../models/Location.model';

class RecipeController {
  async getAllRecipes(req: Request, res: Response) {
    try {
      const recipes = await RecipeModel.find().populate({
        path: 'ingredients.inventoryId',
        model: MaterialModel,
        select: ['name', 'qty', 'img'],
      });


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

      const filePath = path.resolve(__dirname, '../models/recipes.json');

      const recipesJson = fs.readFileSync(
        '/Users/wiaanduvenhage/Desktop/Final Year/Term 1/Dev/rust-stash/server/models/recipes.json',
        'utf-8'
      );
      const data = JSON.parse(recipesJson);

      const recipe = await RecipeModel.insertMany(data);



      if (!recipe) {
        res.status(400).send({ msg: 'Cannot Create Recipe!' });
      }

      return res.status(201).send(recipe);
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }

  async compareMaterials(req: Request, res: Response) {
    try {
      const locationId = req.params.locationId;
      const recipeId = req.params.recipeId;

      let enough: boolean = true;

      const location = await LocationModel.findById(locationId);
      const recipes = await RecipeModel.findById(recipeId);

      interface craftCompare {
        itemId: string;
        qty: number;
      }

      let compareItems: craftCompare[] = [];
      let recipeCompareItems: craftCompare[] = [];
      let filter;


      if (location && recipes) {
        const locationCompareItems = location.locationItems.map(
          (item: any) => ({
            itemId: item.materialId.toString(),
            qty: item.qty,
          })
        );
        compareItems.push(...locationCompareItems);

        const recpCompareItems = recipes.ingredients.map((item: any) => ({
          itemId: item.inventoryId.toString(),
          qty: item.requiredAmount,
        }));
        recipeCompareItems.push(...recpCompareItems);
      }

      filter = compareItems.filter((thisItem) =>
        recipeCompareItems.some(
          (secondary) => thisItem.itemId === secondary.itemId
        )
      );

      for (let i in filter) {
        if (filter[i].qty < recipeCompareItems[i].qty) {
          enough = false;
        }
      }

      return res.status(200).send({ enough });
    } catch (error) {
      res.status(500).send({ msg: error });
    }
  }



  async craftRecipe(req: Request, res: Response) {
    try {
      const locationId = req.params.locationId;
      const recipeId = req.params.recipeId;
      const { name, desc, categories, img, isCraftable, qty } = req.body;
  
      const location = await LocationModel.findById(locationId);
      const recipes = await RecipeModel.findById(recipeId);
  
  
      interface craftBody {
        itemId: string;
        qty: number;
      }
  
      let locationMats: craftBody[] = [];
      let recipeIngredients: craftBody[] = [];
      let filter;
  
      if (location && recipes) {
        const locationMatItems = location.locationItems.map((item: any) => ({
          itemId: item.materialId.toString(),
          qty: item.qty,
        }));
        locationMats.push(...locationMatItems);
  
        const recipeIngredientItems = recipes.ingredients.map((item: any) => ({
          itemId: item.inventoryId.toString(),
          qty: item.requiredAmount,
        }));
        recipeIngredients.push(...recipeIngredientItems);
      }
  
      filter = locationMats.filter((thisItem) =>
        recipeIngredients.some(
          (secondary) => thisItem.itemId === secondary.itemId
        )
      );

      let createRecipe;
      let subtractMaterial;
      for (let i in filter) {
        createRecipe = filter[i].qty - recipeIngredients[i].qty;

        subtractMaterial = await LocationModel.updateOne(
          {
            _id: locationId,
            [`locationItems.materialId`]: filter[i].itemId
          },
          {
            $set: {['locationItems.$.qty']: filter[i].qty - recipeIngredients[i].qty }
          }
        )
      }


  
      const materials = await MaterialModel.create({
        name: recipes!.name,
        desc: recipes!.desc,
        categories: recipes!.categories,
        img: recipes!.recipeImg,
        isCraftable: false,
        qty: 1
      }).then();

      res.status(200).send({materials,subtractMaterial})
  
    } catch (error) {
      res.status(500).send({msg: error})
    }
  }
}

export { RecipeController };
