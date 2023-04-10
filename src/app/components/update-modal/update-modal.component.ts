import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModel } from 'src/shared/Materials.model';
import { LocationService } from 'src/shared/services/location.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {

  loading:boolean = true

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    },1500)
  }

  @Output() btnClick = new EventEmitter();
  @Input() name: string;
  @Input() qty: number;
  @Input() desc: string;
  @Input() img: string;
  @Input() categories: string[];
  @Input() locationId: string;
  @Input() materialId: string;

  increaseQty(){
    this.qty++;
    console.log(this.qty);
  }

  decreaseQty(){
    if (this.qty > 1) {
      this.qty--;
      console.log(this.qty)
    }
  }

  btnSave(){
    // this.btnClick.emit();
    console.log(this.qty);
    console.log(this.locationId)
    console.log(this.materialId)
    this.locationService.updateQty(this.locationId, this.materialId, this.qty).subscribe(data => {
      console.log(data);
    })
  }


  btnClose() {
    this.btnClick.emit();
  }
}
