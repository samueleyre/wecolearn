import {
  Component,
  Injectable, Input, Output, EventEmitter,
} from '@angular/core';


@Component({
  selector: 'app-toggler',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ToggleComponent {
  @Input() active;
  @Input() disabled = false;
  @Output() activeChange = new EventEmitter();

  constructor() {
    //
  }

  toggle() {
    setTimeout(() => {
      this.activeChange.emit(this.active);
    },
               0);
  }
}
