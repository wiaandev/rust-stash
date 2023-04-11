import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RecipeModel } from '../../../shared/Recipes.model';

@Component({
  selector: 'app-craft-block',
  templateUrl: './craft-block.component.html',
  styleUrls: ['./craft-block.component.scss']
})
export class CraftBlockComponent implements OnInit, OnChanges {

  @Output() btnClick = new EventEmitter();
  @Input() canCraft: boolean = true;
  @Input() name: string;
  @Input() img: string;
  @Input() ingredients: [];
  @Input() materials: any;


  material: RecipeModel[];
  locationMats: RecipeModel;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.locationMats = changes.materials.currentValue[0].locationItems;

    for(let item in this.locationMats){
      this.material = this.locationMats[item].qty
      console.log(this.material);
    }
  }

  


}
