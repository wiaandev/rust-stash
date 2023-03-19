import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selected = false;

  onSelect(){
    this.selected = true;
  }

  onClose(){
    this.selected = false;
  }

}
