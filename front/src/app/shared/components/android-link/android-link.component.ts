import { Component, Input } from '@angular/core';

import { LINKS } from '~/config/links';

@Component({
  selector: 'app-android-link',
  templateUrl: './android-link.component.html',
  styleUrls: ['./android-link.component.scss'],
})
export class AndroidLinkComponent {
  public androidLink = LINKS.android;
  @Input() text = 'Application Android';
}
