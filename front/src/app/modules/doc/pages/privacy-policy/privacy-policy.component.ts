import { Component, OnInit } from '@angular/core';

import { NAV } from '~/config/navigation/nav';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  get nav() {
    return NAV;
  }

  getLink(link) {
    return `${environment.publique}${link}`;
  }
}
