import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class ContainerComponent {
  onActivate(event) {
    window.scroll(0, 0);
  }
}
