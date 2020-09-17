import { Component, Injectable, OnInit, Input } from '@angular/core';

@Component({
  selector: 'text-limit',
  templateUrl: 'template.html',
})
export class TextLimitComponent implements OnInit {
  @Input() text: string;
  @Input() classes: string;
  @Input() id: string;

  private _slice = 100;
  public displayText = '';

  ngOnInit() {
    if (this.text) {
      this.displayText = this.textToBig ? this.extract : this.text;
    }
  }

  get textToBig() {
    return this.extract.length !== this.text.length;
  }

  get extract(): string {
    return this.text.slice(0, this._slice);
  }
}
