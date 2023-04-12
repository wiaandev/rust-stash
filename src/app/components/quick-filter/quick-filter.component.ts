import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InventoryDetails } from 'src/shared/InventoryDetails.model';
import { LocationModel } from 'src/shared/Location.model';
import { MaterialModel } from 'src/shared/Materials.model';
import { LocationService } from 'src/shared/services/location.service';

@Component({
  selector: 'app-quick-filter',
  templateUrl: './quick-filter.component.html',
  styleUrls: ['./quick-filter.component.scss']
})
export class QuickFilterComponent implements OnChanges {


  materialsCopy: LocationModel[]
  constructor(private locationService: LocationService) { }

  @Input() materials: LocationModel[];
  deeperMaterials: InventoryDetails[]

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.materials.currentValue);

    // for(let i in this.materials){
      console.log(this.materials[2].locationItems[2].materialId);
    // }
  }

  filterByCategory(category: string){
    console.log(category);
    // console.log(this.materials[0].locationItems[0]['materialId']);
    this.materials = this.materialsCopy;
    for(let i in this.materials){
      console.log(this.materials[i].locationItems[i].materialId);
    }
    // this.materials = this.materials.filter(material => material[0].InventoryDetails.materialId.categories[0] == category)

    // console.log(this.materials)
  }

  getAllMaterials(){
    this.materials;
  }

}
