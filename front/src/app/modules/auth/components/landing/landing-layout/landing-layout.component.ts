import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss'],
})
export class LandingLayoutComponent {
  @Input() title: string;
  @Input() mode: 'light' | 'dark';
}
