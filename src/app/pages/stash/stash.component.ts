import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { StashService } from 'src/shared/services/stash.service';
import { MaterialModel } from 'src/shared/Materials.model';

@Component({
  selector: 'app-stash',
  templateUrl: './stash.component.html',
  styleUrls: ['./stash.component.scss'],
})
export class StashComponent implements OnInit {
  id: string;
  materialData: MaterialModel[];
  searchParam: string;

  constructor(
    private stashService: StashService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  stash: MaterialModel[];

  ngOnInit(): void {
    // this.stashService.getAllStash().subscribe((data) => {
    //   this.stash = data;
    //   console.log(data);
    // });

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

  showComponent(id: string) {
    this.stashService.getOneItem(id).subscribe((data) => {
      this.materialData = data;
      console.log(this.materialData);
      this.display = true;
    });
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
}
