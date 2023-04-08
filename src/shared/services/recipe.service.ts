import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeModel } from "../Recipes.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeService{
    constructor(private http: HttpClient){}

    serverLink = 'http://localhost:3000/recipes';

    recipes: RecipeModel[];

    getRecipes(): Observable<RecipeModel[]>{
        return this.http.get<RecipeModel[]>(this.serverLink)
    }



}