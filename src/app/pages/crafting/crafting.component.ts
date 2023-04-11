import { Component, OnInit } from '@angular/core';
import { RecipeModel } from 'src/shared/Recipes.model';
import { LocationService } from 'src/shared/services/location.service';
import { RecipeService } from 'src/shared/services/recipe.service';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.scss']
})
export class CraftingComponent implements OnInit {

  constructor(private recipeService: RecipeService, private locationService: LocationService) { }

  recipes: RecipeModel[];
  index: number;
  locationData: any[] = [];
  id: string;
  materialData: any[];
  searchParam: string;
  locationItems: any[] = [];
  locationMaterial: any;
  filteredData:any[];
  qty:number;
  isClicked:boolean = false;
  activeLocation: string;
  activeMaterial: string;



  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe(data => {
      this.locationData = data;
    })


    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
      console.log(this.recipes);
    })
  }

  filterByLocation(locationId: string){
    this.activeLocation = locationId;
    this.locationService.getAllMaterialsFromLocation(locationId).subscribe((data) => {
      console.log(data);
      console.log(locationId);
      this.filteredData = data;
      console.log(this.filteredData)
      // console.log(this.materialData);
    });
    this.isClicked = true;
  }

}
