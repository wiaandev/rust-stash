import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModel } from 'src/shared/Materials.model';
import { updateData } from 'src/shared/UpdateData.interface';
import { LocationService } from 'src/shared/services/location.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  loading: boolean = true;
  updateLoading: boolean = true;
  amountWood: number;
  amountStone: number;
  amountMetal: number;
  errorMessage: string;

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

  @Output() newQty: number;

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
        this.qty = this.newQty;
        this.btnClick.emit();
      });
    // window.location.reload();
  }

  btnClose() {
    this.btnClick.emit();
  }

  onTransferToWood(newLocation: string) {
    console.log('Sending to Wood');
    newLocation = '6432a45326d82cdf5b58c42a';
    let transferData : updateData = {
      sendingAmount: this.amountWood,
      currentAmount: this.qty
    }
    // console.log(this.qty - this.amount);
    console.log(this.amountWood)
    this.locationService.transferInventory(this.locationId, newLocation, this.materialId, transferData ).subscribe(data => {
      console.log(data);
    }, error => {
      this.errorMessage = error;
    })
    window.location.reload();
  }

  onTransferToStone(newLocation: string) {
    console.log('Sending to Stone');
    newLocation = '6432a47a26d82cdf5b58c42d';
    let transferData : updateData = {
      sendingAmount: this.amountStone,
      currentAmount: this.qty
    }
    this.locationService.transferInventory(this.locationId, newLocation, this.materialId, transferData).subscribe(data => {
      console.log(data);
    }, error => {
      this.errorMessage = error;
    })
    window.location.reload();
  }
  
  onTransferToMetal(newLocation: string) {
    console.log('Sending to Metal');
    newLocation = '6432a49326d82cdf5b58c430';
    console.log(this.amountMetal)
    let transferData : updateData = {
      sendingAmount: this.amountMetal,
      currentAmount: this.qty
    }
    this.locationService.transferInventory(this.locationId, newLocation, this.materialId, transferData).subscribe(data => {
      console.log(data);
    }, error => {
      this.errorMessage = error;
    })
    window.location.reload();
  }
}
