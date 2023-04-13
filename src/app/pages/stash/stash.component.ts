import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { StashService } from 'src/shared/services/stash.service';
import { LocationService } from 'src/shared/services/location.service';
import { LocationModel } from 'src/shared/Location.model';

@Component({
  selector: 'app-stash',
  templateUrl: './stash.component.html',
  styleUrls: ['./stash.component.scss'],
})
export class StashComponent implements OnInit {
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
  textFiltered: LocationModel[];

  constructor(
    private stashService: StashService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
 

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe(data => {
      this.locationData = data;
      console.log(this.locationData[0].locationItems[0].materialId.name);
    })
  }

  display = false;

  showComponent(locationId:string, materialId: string) {
    this.activeLocation = locationId;
    console.log(locationId)
    this.activeMaterial= materialId;
    this.locationService.getMaterialFromLocation(this.activeLocation,materialId).subscribe((data) => {
      console.log(data);
      this.locationMaterial = data;
      console.log(this.locationMaterial.qty)
    });
    this.display = true;
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


    this.route.queryParams.pipe(
      switchMap((params: Params) => {
        if (params.search) {
          console.log(params.search);
          return this.locationService.getMaterialsBySearch(params.search);
        } else {
          return this.locationService.getAllMaterialsFromLocation(locationId);
        }
      })    
    ).subscribe((data) => {
      this.filteredData = data;
      console.log(data[0].locationItems);
    });
  }

  showId(id: string) {
    console.log(id);
  }

  hideComponent() {
    this.display = false;
  }

  onFilter(id: string){
    this.locationService.getOneLocation(id).subscribe(data => {
      this.locationData = data;
      console.log(this.locationData);
      console.log("filter is running");
    })
  }

}
