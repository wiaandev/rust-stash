import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModel } from 'src/shared/Materials.model';
import { LocationService } from 'src/shared/services/location.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  loading: boolean = true;
  amountWood: number;
  amountStone: number;
  amountMetal: number;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  @Output() btnClick = new EventEmitter();
  @Input() name: string;
  @Input() qty: number;
  @Input() desc: string;
  @Input() img: string;
  @Input() categories: string[];
  @Input() locationId: string;
  @Input() materialId: string;

  increaseQty() {
    this.qty++;
    console.log(this.qty);
  }

  decreaseQty() {
    if (this.qty > 1) {
      this.qty--;
      console.log(this.qty);
    }
  }

  btnSave() {
    // this.btnClick.emit();
    console.log(this.qty);
    console.log(this.locationId);
    console.log(this.materialId);
    this.locationService
      .updateQty(this.locationId, this.materialId, this.qty)
      .subscribe((data) => {
        console.log(data);
      });
    window.location.reload();
  }

  btnClose() {
    this.btnClick.emit();
  }

  onTransferToWood(newLocation: string) {
    console.log('Sending to Wood');
    newLocation = '6432a45326d82cdf5b58c42a';
    // console.log(this.qty - this.amount);
    this.locationService.transferInventory(this.locationId, newLocation, this.materialId, this.amountWood).subscribe(data => {
      console.log(data);
    })
  }

  onTransferToStone(newLocation: string) {
    console.log('Sending to Stone');
    newLocation = '6432a47a26d82cdf5b58c42d';
    this.locationService.transferInventory(this.locationId, newLocation, this.materialId, this.amountStone).subscribe(data => {
      console.log(data);
    })
  }
  
  onTransferToMetal(newLocation: string) {
    console.log('Sending to Metal');
    newLocation = '6432a49326d82cdf5b58c430';
    this.locationService.transferInventory(this.locationId, newLocation, this.materialId, this.amountMetal).subscribe(data => {
      console.log(data);
    })
  }
}
