import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class ContainerComponent implements OnInit {
  constructor() {
    //
  }

  ngOnInit() {
    //
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
