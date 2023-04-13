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

      const recipesJson = fs.readFileSync(
        '/Users/wiaanduvenhage/Desktop/Final Year/Term 1/Dev/rust-stash/server/models/recipes.json',
        'utf-8'
      );
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

  async compareMaterials(req: Request, res: Response) {
    try {
      // Use ids of location and recipe
      const locationId = req.params.locationId;
      const recipeId = req.params.recipeId;

      let enough: boolean = true;

      //Find the location of specified
      const location = await LocationModel.findById(locationId);
      //Find recipe based on specified
      const recipes = await RecipeModel.findById(recipeId);

      // Interface to specify the details that we need
      interface craftCompare {
        itemId: string;
        qty: number;
      }

      let compareItems: craftCompare[] = [];
      let recipeCompareItems: craftCompare[] = [];
      let filter;

      // Loop through both datasets to get the craftCompare to populate with needed information

      // if (location && recipes) {
      //   const locationCompareItems = location.locationItems.map((item: any) => {
      //     compareItems.push({
      //       itemId: item.materialId.toString(),
      //       qty: item.qty,
      //     });
      //   });

      //   const recpCompareItems = recipes.ingredients.map((item: any) => {
      //     recipeCompareItems.push({
      //       itemId: item.inventoryId.toString(),
      //       qty: item.requiredAmount,
      //     });
      //   });
      // }

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
          console.log('You do not have enough');
          enough = false;
        }
      }

      console.log('You can craft: ' + enough);

      // console.log("LOCATION:", location)
      // console.log("----------------------------")
      // console.log("RECIPE:", recipes)
      console.log('----------------------------');
      console.log('LOCATION ITEMS FILTERED:', compareItems);
      console.log('----------------------------');
      console.log('RECIPE ITEMS FILTERED:', recipeCompareItems);
      console.log('----------------------------');
      console.log(' ITEMS FILTERED:', filter);

      // const locationPop = await LocationModel.findById(locationId).populate({
      //   path: 'locationItems.materialId',
      //   populate: {
      //     path: 'name',
      //     select: 'name',
      //   },
      //   model: MaterialModel,
      // });

      // let canCraft = false;

      // for(const ingredient of recipes.ingredients){
      //   const material = locationPop?.locationItems.find(item => {
      //     return item.materialId === ingredient.inventoryId;
      //   })
      //   console.log(material);
      //   if(!material || material.qty < ingredient.requiredAmount){
      //     canCraft = false;
      //     break;
      //   }else{
      //     canCraft = true;
      //   }
      // }

      // if(canCraft){
      //   res.send(`You can craft ${recipes.name}`)
      // } else {
      //   res.send(`You cannot craft ${recipes.name}`)
      // }

      return res.status(200).send({ enough });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error });
    }
  }

  //   TODO: Minimise qty of inventory of location.
  //   TODO: Insert crafted item into inventory.
  async craftRecipe(req: Request, res: Response) {
    try {
      const locationId = req.params.locationId;
      const recipeId = req.params.recipeId;
      const { name, desc, categories, img, isCraftable, qty } = req.body;
  
      //Find the location of specified
      const location = await LocationModel.findById(locationId);
      //Find recipe based on specified
      const recipes = await RecipeModel.findById(recipeId);
  
  
      // Interface to specify the details that we need
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

      let createRecipe =0;
      for (let i in filter) {
        console.log(recipeIngredients[i].qty)
        console.log(filter[i].qty)
        createRecipe = recipeIngredients[i].qty - filter[i].qty;
      }

      console.log(createRecipe)
  
      const materials = await MaterialModel.create({
        name: recipes!.name,
        desc: recipes!.desc,
        categories: recipes!.categories,
        img: recipes!.recipeImg,
        isCraftable: false,
        qty: 1
      });


      res.status(200).send({materials, createRecipe})
  
    } catch (error) {
      console.log(error);
      res.status(500).send({msg: error})
    }
  }
}

export { RecipeController };
