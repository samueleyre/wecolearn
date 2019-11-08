import { Component, Injectable, OnInit, Input } from '@angular/core';

@Component({
  selector: 'text-limit',
  templateUrl: 'template.html',
})

@Injectable()
export class TextLimitComponent implements OnInit {
  @Input() text: string;
  @Input() classes: string;
  @Input() id: string;
  displayText = '';

  ngOnInit() {
    if (this.text) {
      const newText = this.text.slice(0, 100);
      this.displayText = (newText.length !== this.text.length) ? newText : this.text;
    }
  }
}
