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
      // for(let item of this.locationMaterial){
      //   this.qty = this.locationMaterial[item].qty;
      //   console.log(this.qty);
      // }
      // console.log(this.materialData);
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
      // console.log(this.materialData);
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
    // this.hideComponent();
  }

  // searchMaterials() {

  //   if (this.searchParam === '') {
  //     this.locationService.getAllMaterialsFromLocation(this.activeLocation).subscribe((data) => {
  //       // this.filteredData = data;
  //       this.textFiltered = data;
  //       console.log(this.textFiltered);
  //       // console.log(this.filteredData[0].locationItems.name);
  //     });
  //   } else {
  //     // Filter the stash array based on the searchParam
  //     this.textFiltered = this.textFiltered.filter((item) => {
  //       console.log(this.textFiltered);
  //       return item.locationItems[0].materialId[0].name.toLowerCase().includes(this.searchParam.toLowerCase());
  //       const locationItems = item.locationItems;
  //       // const materialId = locationItems?.materialId;
  //       // const materialName = materialId?.name;
    
  //       console.log('Location items:', locationItems);
  //       // console.log('Material ID:', materialId);
  //       // console.log('Material name:', materialName);
    
  //       // return materialName?.toLowerCase().includes(this.searchParam.toLowerCase());
      
  //     });

  //     console.log(this.filteredData);
  //   }
  //   // this.stash = this.stash.filter(item => item.name.toLowerCase().includes(this.searchParam.toLowerCase()));
  //   this.router.navigate([], {
  //     relativeTo: this.route,
  //     queryParams: {search: this.searchParam},
  //     queryParamsHandling: 'preserve',
  //     skipLocationChange: true
  //   })
  //   console.log(this.textFiltered);
  // }

  onFilter(id: string){
    this.locationService.getOneLocation(id).subscribe(data => {
      this.locationData = data;
      console.log(this.locationData);
      console.log("filter is running");
    })
  }

  // onChangeLocation(category: string){
  //   this.locationService.getOneLocation(category).subscribe((data)=>{
  //       this.stash = lcaotionStash()
  //   })
  // }

  // (click)="onChangeLocation("Armored Base")"
}
