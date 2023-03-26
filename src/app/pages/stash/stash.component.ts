import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StashService } from 'src/app/services/stash.service';
import { MaterialModel } from 'src/shared/Materials.model';

@Component({
  selector: 'app-stash',
  templateUrl: './stash.component.html',
  styleUrls: ['./stash.component.scss']
})
export class StashComponent implements OnInit {

  id: string;

  constructor(private stashService: StashService, private route: ActivatedRoute) { }

  stash: MaterialModel[] = []

  ngOnInit(): void {

    this.stashService.getAllStash().subscribe((data) => {
      console.log(data);
      this.stash = data;
    })
  }

  display = false;

  showComponent(id: string){
    this.stashService.getOneItem(id).subscribe((data) => {
      this.stash = data;
      console.log(data);
    });
    this.display = true;
  }

  showId(id: string){
    console.log(id);
  }

  hideComponent(){
    this.display = false;
  }

}
