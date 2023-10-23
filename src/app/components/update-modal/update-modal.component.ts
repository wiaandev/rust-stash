import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModel } from 'src/shared/Materials.model';
import { updateData } from 'src/shared/UpdateData.interface';
import { LocationService } from 'src/shared/services/location.service';
import { StashService } from '../../../shared/services/stash.service';

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

  constructor(
    private locationService: LocationService,
    private stashService: StashService
  ) {}

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
  }

  decreaseQty() {
    if (this.qty > 1) {
      this.qty--;
    }
  }

  btnSave() {
    this.locationService
      .updateQty(this.locationId, this.materialId, this.qty)
      .subscribe((data) => {
        this.qty = this.newQty;
        window.location.reload();
      });
  }

  btnClose() {
    this.btnClick.emit();
  }

  // btnDelete() {
  //   this.stashService.deleteOneMaterial(this.materialId).subscribe((data) => {
  //     window.location.reload();
  //     console.log(data);
  //   });
  // }

  onTransferToWood(newLocation: string) {
    newLocation = '6432a45326d82cdf5b58c42a';
    let transferData: updateData = {
      sendingAmount: this.amountWood,
      currentAmount: this.qty,
    };
    this.locationService
      .transferInventory(
        this.locationId,
        newLocation,
        this.materialId,
        transferData
      )
      .subscribe(
        (data) => {
          window.location.reload();
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

  onTransferToStone(newLocation: string) {
    newLocation = '6432a47a26d82cdf5b58c42d';
    let transferData: updateData = {
      sendingAmount: this.amountStone,
      currentAmount: this.qty,
    };
    this.locationService
      .transferInventory(
        this.locationId,
        newLocation,
        this.materialId,
        transferData
      )
      .subscribe(
        (data) => {
          window.location.reload();
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

  onTransferToMetal(newLocation: string) {
    newLocation = '6432a49326d82cdf5b58c430';
    let transferData: updateData = {
      sendingAmount: this.amountMetal,
      currentAmount: this.qty,
    };
    this.locationService
      .transferInventory(
        this.locationId,
        newLocation,
        this.materialId,
        transferData
      )
      .subscribe(
        (data) => {
          window.location.reload();
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }
}
