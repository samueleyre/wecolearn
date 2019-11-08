import { Component, Injectable, OnInit, Input } from '@angular/core';


@Component({
  selector: 'copy',
  templateUrl: 'template.html',
})

@Injectable()
export class CopyComponent implements OnInit {
  @Input() data: string;
  public rand: string;

  ngOnInit() {
    this.rand = String(Math.floor(Math.random() * (10000))); // tslint:disable-line no-magic-numbers
  }

  copy() {
    const input: HTMLInputElement = <HTMLInputElement>document.getElementById('copy' + this.rand);
    input.style.display = 'block';
    input.select();
    document.execCommand('copy');
    input.style.display = 'none';
  }
}

