import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeModel } from "../Recipes.model";
import { Observable } from "rxjs";
import {CraftingCheckResponse} from '../CraftingCheckResponse.interface';
import { MaterialModel } from "../Materials.model";

@Injectable({providedIn: 'root'})
export class RecipeService{
    constructor(private http: HttpClient){}

    serverLink = 'http://localhost:3000/recipes';

    recipes: RecipeModel[];

    getRecipes(): Observable<RecipeModel[]>{
        return this.http.get<RecipeModel[]>(this.serverLink)
    }

    checkCrafting(locationId: string, recipeId: string): Observable<CraftingCheckResponse>{
        return this.http.get<CraftingCheckResponse>(`${this.serverLink}/location/${locationId}/single/${recipeId}`)
    }

    craftRecipe(recipeId: string, locationId: string, tool: any){
        return this.http.post(`${this.serverLink}/craft/${recipeId}/in/${locationId}`, tool)
    }



}