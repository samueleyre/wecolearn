import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-saving-input',
  templateUrl: './saving-input.component.html',
  styleUrls: ['./saving-input.component.scss'],
})
export class SavingInputComponent implements OnInit {
  @Input() saving;
  @Input() dirty = true;

  constructor() { }

  ngOnInit() {
  }
}
