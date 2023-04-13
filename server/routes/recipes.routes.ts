import express, { Express, Request, Response } from 'express';
import { RecipeController } from '../controllers/recipes.controller';

const recipeRouter: Express = express();
const recipeController = new RecipeController();

recipeRouter.get('/recipes', recipeController.getAllRecipes);
recipeRouter.post('/recipes', recipeController.addRecipe);
recipeRouter.get('/recipes/location/:locationId/single/:recipeId', recipeController.compareMaterials);
recipeRouter.post('/recipes/craft/:recipeId/in/:locationId', recipeController.craftRecipe);

module.exports = recipeRouter;
