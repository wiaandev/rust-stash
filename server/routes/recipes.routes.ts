import express, { Express, Request, Response } from 'express';
import { RecipeController } from '../controllers/recipes.controller';

const recipeRouter: Express = express();
const recipeController = new RecipeController();

recipeRouter.get('/recipes', recipeController.getAllRecipes);
recipeRouter.post('/recipes', recipeController.addRecipe);

module.exports = recipeRouter;
