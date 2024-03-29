import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RecipeModel } from '../../../shared/Recipes.model';
import { RecipeService } from 'src/shared/services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-craft-block',
  templateUrl: './craft-block.component.html',
  styleUrls: ['./craft-block.component.scss'],
})
export class CraftBlockComponent implements OnInit, OnChanges {
  @Output() btnClick = new EventEmitter();
  @Input() canCraft: boolean;
  @Input() name: string;
  @Input() img: string;
  @Input() ingredients: [];
  @Input() materials: any;
  @Input() recipeData: [];
  @Input() recipeId: string;
  @Input() currentLocation: string;
  @Input() categories: string[]
  @Input() desc: string[]

  checkMode: boolean = false;

  material: RecipeModel[];
  locationMats: RecipeModel;
  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.locationMats = changes.materials.currentValue[0].locationItems;

    for (let item in this.locationMats) {
      this.material = this.locationMats[item].qty;
    }

  }

  checkCrafting() {
    this.recipeService
      .checkCrafting(this.currentLocation, this.recipeId)
      .subscribe(data => {
        this.canCraft = data.enough;
      });
    this.checkMode = !this.checkMode;
  }

  craftRecipe(){

    const tool = {
      name: this.name,
      desc: this.desc,
      categories: this.categories,
      img: this.img,
      isCraftable: false,
      qty: 1
      
    }
    this.recipeService.craftRecipe(this.recipeId, this.currentLocation, tool).subscribe(data => {
      this.router.navigate(['/stash'])
    })
  }
}
