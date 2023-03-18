import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Output() btnClick = new EventEmitter();

  btnClose() {
    this.btnClick.emit();
  }
}
