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

      if (location && recipes) {
        const locationCompareItems = location.locationItems.map(
          (item: any) => ({
            itemId: item.materialId.toString(),
            qty: item.qty,
          })
        );
        compareItems.push(...locationCompareItems);
        console.log(locationCompareItems);

        const recpCompareItems = recipes.ingredients.map((item: any) => ({
          itemId: item.inventoryId.toString(),
          qty: item.requiredAmount,
        }));
        recipeCompareItems.push(...recpCompareItems);
        console.log(recpCompareItems);
      }

      for (const requiredItem of recipeCompareItems) {
        const matchingAvailableItem = compareItems.find(
          (availableItem) => availableItem.itemId === requiredItem.itemId
        );

        if (
          !matchingAvailableItem ||
          matchingAvailableItem.qty < requiredItem.qty
        ) {
          enough = false; // If any required item is not available in sufficient quantity, set enough to false
          break; // Exit the loop early
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

      //finding the location and recipe I want to craft
      let location = await LocationModel.findById(locationId);
      const recipes = await RecipeModel.findById(recipeId);

      //creating an interface for what I want to craft and how much of it
      interface craftBody {
        itemId: string;
        qty: number;
      }

      let locationMats: craftBody[] = [];
      let recipeIngredients: craftBody[] = [];
      // let filter;

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
      
      for (let i = 0; i < recipeIngredients.length; i++) {
        const ingredient = recipeIngredients[i];
        const locationMat = locationMats.find(
          (mat) => mat.itemId === ingredient.itemId
        );
        if (locationMat) {
          if (locationMat.qty >= ingredient.qty) {
            locationMat.qty -= ingredient.qty;
          } else {
            return res.status(405).send('not enough materials');
          }
        }
      }

      //update the location with modified materials
      const updateResult = await LocationModel.updateOne(
        { _id: locationId },
        {
          locationItems: locationMats.map((mat) => ({
            materialId: mat.itemId,
            qty: mat.qty,
          })),
        }
      );

      //add the crafted material to location's items
      const craftedMaterial = await MaterialModel.create({
        name: recipes!.name,
        desc: recipes!.desc,
        categories: recipes!.categories,
        img: recipes!.recipeImg,
        isCraftable: false,
        qty: 1,
      });

      locationMats.push({
        itemId: craftedMaterial._id.toString(),
        qty: 1,
      });

      //update the location with the crafted material
      await LocationModel.updateOne(
        { _id: locationId },
        {
          locationItems: locationMats.map((mat) => ({
            materialId: mat.itemId,
            qty: mat.qty,
          })),
        }
      );

      //update the location variable with the latest data
      location = await LocationModel.findById(locationId).populate({
        path: 'locationItems.materialId',
        populate: {
          path: 'name',
          select: 'name',
        },
        model: MaterialModel,
      });

      //update the materials and location variables with the latest data
      const updatedMaterials = await MaterialModel.find();
      const updatedLocation = location;

      //send the updated materials and location
      res
        .status(200)
        .json({ materials: updatedMaterials, location: updatedLocation });
    } catch (error) {
      res;
    }
  }
}

export { RecipeController };
