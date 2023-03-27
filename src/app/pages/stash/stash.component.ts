import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StashService } from 'src/app/services/stash.service';
import { MaterialModel } from 'src/shared/Materials.model';

@Component({
  selector: 'app-stash',
  templateUrl: './stash.component.html',
  styleUrls: ['./stash.component.scss'],
})
export class StashComponent implements OnInit {
  id: string;
  materialData: MaterialModel[];

  name: string;
  qty: number;
  desc: string;
  img: string;
  categories: string[];

  constructor(
    private stashService: StashService,
    private route: ActivatedRoute
  ) {}

  stash: MaterialModel[];

  ngOnInit(): void {
    this.stashService.getAllStash().subscribe((data) => {
      this.stash = data;
      console.log(data);
    });
  }

  display = false;

  showComponent(id: string) {
    this.stashService.getOneItem(id).subscribe((data) => {
      this.name = data['name'];
      this.qty = data['qty'];
      this.desc = data['desc'];
      this.img = data['img'];
      this.categories = data['categories'];
      this.materialData = data;
      console.log(this.materialData);
      this.display = true;
      // this.hideComponent();
    });
  }

  showId(id: string) {
    console.log(id);
  }

  hideComponent(id: string) {
    this.display = false;
    // this.hideComponent();
  }
}
