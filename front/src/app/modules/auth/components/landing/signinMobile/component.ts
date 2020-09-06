import { Component, OnInit } from '@angular/core';

import { environment } from '~/../environments/environment';


@Component({
  selector: 'landing-signin-mobile',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class LandingSigninMobileComponent {
  public get isAndroid() {
    return environment.android;
  }
}
