import { Component, OnInit } from '@angular/core';

import { FOUNDERS_SOCIALS } from '~/modules/doc/config/founders_socials.const';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {
  socials = FOUNDERS_SOCIALS;
}
