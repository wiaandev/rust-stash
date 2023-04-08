import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-craft-block',
  templateUrl: './craft-block.component.html',
  styleUrls: ['./craft-block.component.scss']
})
export class CraftBlockComponent implements OnInit {

  @Output() btnClick = new EventEmitter();
  @Input() canCraft: boolean;
  @Input() name: string;
  @Input() img: string;
  @Input() ingredients: [];
  constructor() { }

  ngOnInit(): void {
  }


}
