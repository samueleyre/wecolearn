import { Component } from '@angular/core';

import { SOCIALS } from '~/shared/modules/footer/config/socials';
import { NAV } from '~/config/navigation/nav';


@Component({
  selector: 'main-footer',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class MainFooterComponent {
  public navLinks = NAV;
  public socialLinks = SOCIALS;

  now = new Date();
}
