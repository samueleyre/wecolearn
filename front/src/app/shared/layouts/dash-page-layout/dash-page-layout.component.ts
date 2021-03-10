import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dash-page-layout',
  templateUrl: './dash-page-layout.component.html',
  styleUrls: ['./dash-page-layout.component.scss']
})
export class DashPageLayoutComponent {
  @Input() title;
}
