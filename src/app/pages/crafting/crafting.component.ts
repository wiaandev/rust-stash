import { Component, OnInit } from '@angular/core';
import { RecipeModel } from 'src/shared/Recipes.model';
import { RecipeService } from 'src/shared/services/recipe.service';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.scss']
})
export class CraftingComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  recipes: RecipeModel[];
  index: number;

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
      console.log(this.recipes);
    })
  }

}
