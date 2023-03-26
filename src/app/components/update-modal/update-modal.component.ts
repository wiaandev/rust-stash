import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModel } from 'src/shared/Materials.model';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Output() btnClick = new EventEmitter();
  @Input() selectedMaterial: MaterialModel;

  btnClose() {
    this.btnClick.emit();
  }
}
