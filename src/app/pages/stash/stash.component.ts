import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { StashService } from 'src/shared/services/stash.service';
import { MaterialModel } from 'src/shared/Materials.model';
import { LocationService } from 'src/shared/services/location.service';

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

  constructor(
    private stashService: StashService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  stash: MaterialModel[];
 

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe(data => {
      this.locationData = data;
      console.log(this.locationData[0].locationItems[0].materialId.name);

      // let items =this.locationData.map((i: any, index) =>{
      //   return i.locationItems.map((j: any) =>{
      //     return this.locationItems.push(j)
      //   })
      // });

      // console.log(items)
    })

    this.route.queryParams.pipe(
      switchMap((params: Params) => {
        if (params.search) {
          console.log(params.search);
          return this.stashService.getStashBySearch(params.search);
        } else {
          return this.stashService.getAllStash();
        }
      })    
    ).subscribe((data) => {
      this.stash = data;
      console.log(data);
    });
  }

  display = false;

  showComponent(locationId:string, materialId: string) {

    console.log(locationId)
    console.log(materialId)
    this.locationService.getMaterialFromLocation(locationId,materialId).subscribe((data) => {
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
  }

  showId(id: string) {
    console.log(id);
  }

  hideComponent() {
    this.display = false;
    // this.hideComponent();
  }

  searchStash() {
    if (this.searchParam === '') {
      this.stashService.getAllStash().subscribe((data) => {
        this.stash = data;
      });
    } else {
      // Filter the stash array based on the searchParam
      this.stash = this.stash.filter((item) => {
        return item.name.toLowerCase().includes(this.searchParam.toLowerCase());
      });
    }
    // this.stash = this.stash.filter(item => item.name.toLowerCase().includes(this.searchParam.toLowerCase()));
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {search: this.searchParam},
      queryParamsHandling: 'preserve',
      skipLocationChange: true
    })
    console.log(this.stash);
  }

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
