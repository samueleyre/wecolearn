import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-doc-page-layout',
  templateUrl: './doc-page-layout.component.html',
  styleUrls: ['./doc-page-layout.component.scss'],
})
export class DocPageLayoutComponent {
  @Input() title;

  constructor(private _router: Router) {
    _router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
