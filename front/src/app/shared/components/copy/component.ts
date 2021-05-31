import {Component, Injectable, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {MatTooltip} from '@angular/material';


@Component({
  selector: 'copy',
  templateUrl: 'template.html',
  styleUrls: ['copy.component.scss'],
})export class CopyComponent implements OnInit {
  @Input() data: string;
  public rand: string;

  @ViewChild('tooltip', { static: false }) tooltip: MatTooltip;

  ngOnInit() {
    this.rand = String(Math.floor(Math.random() * (10000))); // tslint:disable-line no-magic-numbers
  }

  copy() {
    this.tooltip.show();
    const input: HTMLInputElement = <HTMLInputElement>document.getElementById('copy' + this.rand);
    input.style.display = 'block';
    input.select();
    document.execCommand('copy');
    input.style.display = 'none';
  }
}

