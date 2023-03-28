import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModel } from 'src/shared/Materials.model';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {

  materialQty:number = 30;

  constructor() {}

  ngOnInit(): void {}

  @Output() btnClick = new EventEmitter();
  @Input() name: string;
  @Input() qty: number = this.materialQty;
  @Input() desc: string;
  @Input() img: string;
  @Input() categories: string[];

  increaseQty(){
    this.materialQty++;
  }

  decreaseQty(){
    if (this.materialQty > 1) {
      this.materialQty--;
    }
  }


  btnClose() {
    this.btnClick.emit();
  }
}
