"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipes_controller_1 = require("../controllers/recipes.controller");
const recipeRouter = (0, express_1.default)();
const recipeController = new recipes_controller_1.RecipeController();
recipeRouter.get('/recipes', recipeController.getAllRecipes);
recipeRouter.post('/recipes', recipeController.addRecipe);
recipeRouter.get('/recipes/location/:locationId/single/:recipeId', recipeController.compareMaterials);
recipeRouter.post('/recipes/craft/:recipeId/in/:locationId', recipeController.craftRecipe);
module.exports = recipeRouter;
