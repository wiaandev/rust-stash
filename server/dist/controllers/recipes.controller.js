"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const Recipe_model_1 = require("../models/Recipe.model");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const Material_model_1 = require("../models/Material.model");
const Location_model_1 = require("../models/Location.model");
class RecipeController {
    getAllRecipes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipes = yield Recipe_model_1.RecipeModel.find().populate({
                    path: 'ingredients.inventoryId',
                    model: Material_model_1.MaterialModel,
                    select: ['name', 'qty', 'img'],
                });
                if (!recipes) {
                    res.status(404).send({ msg: 'Recipes could not be found' });
                }
                return res.send(recipes);
            }
            catch (err) {
                return res.status(500).send({ error: err });
            }
        });
    }
    addRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filePath = path_1.default.resolve(__dirname, '../models/recipes.json');
                const recipesJson = fs.readFileSync('/Users/wiaanduvenhage/Desktop/Final Year/Term 1/Dev/rust-stash/server/models/recipes.json', 'utf-8');
                const data = JSON.parse(recipesJson);
                const recipe = yield Recipe_model_1.RecipeModel.insertMany(data);
                if (!recipe) {
                    res.status(400).send({ msg: 'Cannot Create Recipe!' });
                }
                return res.status(201).send(recipe);
            }
            catch (err) {
                res.status(500).send({ error: err });
            }
        });
    }
    compareMaterials(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationId = req.params.locationId;
                const recipeId = req.params.recipeId;
                let enough = true;
                const location = yield Location_model_1.LocationModel.findById(locationId);
                const recipes = yield Recipe_model_1.RecipeModel.findById(recipeId);
                let compareItems = [];
                let recipeCompareItems = [];
                let filter;
                if (location && recipes) {
                    const locationCompareItems = location.locationItems.map((item) => ({
                        itemId: item.materialId.toString(),
                        qty: item.qty,
                    }));
                    compareItems.push(...locationCompareItems);
                    const recpCompareItems = recipes.ingredients.map((item) => ({
                        itemId: item.inventoryId.toString(),
                        qty: item.requiredAmount,
                    }));
                    recipeCompareItems.push(...recpCompareItems);
                }
                filter = compareItems.filter((thisItem) => recipeCompareItems.some((secondary) => thisItem.itemId === secondary.itemId));
                for (let i in filter) {
                    if (filter[i].qty < recipeCompareItems[i].qty) {
                        enough = false;
                    }
                }
                return res.status(200).send({ enough });
            }
            catch (error) {
                res.status(500).send({ msg: error });
            }
        });
    }
    craftRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locationId = req.params.locationId;
                const recipeId = req.params.recipeId;
                const { name, desc, categories, img, isCraftable, qty } = req.body;
                const location = yield Location_model_1.LocationModel.findById(locationId);
                const recipes = yield Recipe_model_1.RecipeModel.findById(recipeId);
                let locationMats = [];
                let recipeIngredients = [];
                let filter;
                if (location && recipes) {
                    const locationMatItems = location.locationItems.map((item) => ({
                        itemId: item.materialId.toString(),
                        qty: item.qty,
                    }));
                    locationMats.push(...locationMatItems);
                    const recipeIngredientItems = recipes.ingredients.map((item) => ({
                        itemId: item.inventoryId.toString(),
                        qty: item.requiredAmount,
                    }));
                    recipeIngredients.push(...recipeIngredientItems);
                }
                filter = locationMats.filter((thisItem) => recipeIngredients.some((secondary) => thisItem.itemId === secondary.itemId));
                let createRecipe;
                let subtractMaterial;
                for (let i in filter) {
                    createRecipe = filter[i].qty - recipeIngredients[i].qty;
                    subtractMaterial = yield Location_model_1.LocationModel.updateOne({
                        _id: locationId,
                        [`locationItems.materialId`]: filter[i].itemId
                    }, {
                        $set: { ['locationItems.$.qty']: filter[i].qty - recipeIngredients[i].qty }
                    });
                }
                const materials = yield Material_model_1.MaterialModel.create({
                    name: recipes.name,
                    desc: recipes.desc,
                    categories: recipes.categories,
                    img: recipes.recipeImg,
                    isCraftable: false,
                    qty: 1
                }).then();
                res.status(200).send({ materials, subtractMaterial });
            }
            catch (error) {
                res.status(500).send({ msg: error });
            }
        });
    }
}
exports.RecipeController = RecipeController;
