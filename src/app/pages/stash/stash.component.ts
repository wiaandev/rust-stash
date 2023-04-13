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
    })
  }

  display = false;

  showComponent(locationId:string, materialId: string) {
    this.activeLocation = locationId;
    this.activeMaterial= materialId;
    this.locationService.getMaterialFromLocation(this.activeLocation,materialId).subscribe((data) => {
      this.locationMaterial = data;
    });
    this.display = true;
  }

  filterByLocation(locationId: string){
    this.activeLocation = locationId;
    this.locationService.getAllMaterialsFromLocation(locationId).subscribe((data) => {
      this.filteredData = data;
    });
    this.isClicked = true;


    this.route.queryParams.pipe(
      switchMap((params: Params) => {
        if (params.search) {
          return this.locationService.getMaterialsBySearch(params.search);
        } else {
          return this.locationService.getAllMaterialsFromLocation(locationId);
        }
      })    
    ).subscribe((data) => {
      this.filteredData = data;
    });
  }

  showId(id: string) {
  }

  hideComponent() {
    this.display = false;
  }

  onFilter(id: string){
    this.locationService.getOneLocation(id).subscribe(data => {
      this.locationData = data;
    })
  }

}
