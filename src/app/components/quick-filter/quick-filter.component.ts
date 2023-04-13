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
  }

  filterByCategory(category: string){
    this.materials = this.materialsCopy;
  }

  getAllMaterials(){
    this.materials;
  }

}
