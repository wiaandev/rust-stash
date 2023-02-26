import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  buttonText = '';

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set text(name: string){
    this.buttonText = name;
  }

  get name(): string {
    return this.buttonText;
  }

  @Input() color: string = 'CE422B'
  @Input() type: string = 'button';
  @Output() btnClick = new EventEmitter();
  @Input() isDisabled = false;
  @Input() class: string;

  onClick(){
    this.btnClick.emit();
  }

}
