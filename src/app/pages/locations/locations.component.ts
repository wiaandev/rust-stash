import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/shared/services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  id: string;
  materialData: any[];
  searchParam: string;
  locationData: any[] = [];
  locationItems: any[] = [];
  locationMaterial: any;
  filteredData:any[];
  qty:number;
  isClicked:boolean = false;
  activeLocation: string;
  activeMaterial: string;

  constructor(
    private locationService: LocationService,
  ) { }

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe(data => {
      this.locationData = data;
      console.log(this.locationData[0].locationItems[0].materialId.categories);
    })
  }

  selected = false;

  onSelect(){
    this.selected = true;
  }

  onClose(){
    this.selected = false;
  }


  filterByLocation(locationId: string){
    this.activeLocation = locationId;
    this.locationService.getAllMaterialsFromLocation(locationId).subscribe((data) => {
      console.log(data);
      console.log(locationId);
      this.filteredData = data;
      console.log(this.filteredData)
    });
    this.isClicked = true;
  }

}
