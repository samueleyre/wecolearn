import { Component, Injectable, OnInit, Input } from '@angular/core';
import {NAV} from '~/config/navigation/nav';

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

  get profilePublicLink() {
    return NAV.profilePublic;
  }

  get textToBig() {
    return this.extract.length !== this.text.length;
  }

  get extract(): string {
    return this.text.slice(0, this._slice);
  }
}
