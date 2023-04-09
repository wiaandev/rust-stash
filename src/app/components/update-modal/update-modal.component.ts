import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModel } from 'src/shared/Materials.model';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {

  loading:boolean = true

  constructor() {}

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
    this.btnClick.emit();
    console.log(this.qty);
  }


  btnClose() {
    this.btnClick.emit();
  }
}
