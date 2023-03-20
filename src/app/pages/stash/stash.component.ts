import { Component, OnInit } from '@angular/core';
import { StashService } from 'src/app/services/stash.service';
import { MaterialModel } from 'src/shared/Materials.model';

@Component({
  selector: 'app-stash',
  templateUrl: './stash.component.html',
  styleUrls: ['./stash.component.scss']
})
export class StashComponent implements OnInit {

  constructor(private stashService: StashService) { }

  stash: MaterialModel[] = []

  ngOnInit(): void {
    this.stashService.getAllStash().subscribe((data) => {
      console.log(data);
      this.stash = data;
    })
  }

  display = false;

  showComponent(){
    this.display = true;
  }

  hideComponent(){
    this.display = false;
  }

}
