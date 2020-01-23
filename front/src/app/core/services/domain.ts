import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { subdomains } from '~/config/domain';
import { rocketchats, slacks, slacksSubDomains, rocketChatDomains } from '~/config/slack';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class DomainService {
  private subdomain: string;
  private location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  setSubDomain() {
    let subdomain = null;
    if (environment.production) {
      const location = window.location.href;
      const regex = /(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i;

      if (location.match(regex) && location.match(regex)[1]) {
        subdomain = location.match(regex)[1];
      } else {
        return this.subdomain = 'wecolearn';
      }

      if (null !== subdomain && 'www' !== subdomain && subdomains.indexOf(subdomain) !== -1) {
        this.subdomain = subdomain;
        return subdomain;
      }
      return this.subdomain = 'wecolearn';
    }
    if (!this.subdomain) {
      return this.subdomain = 'wecolearn';
    }
  }

  getSubDomain() {
    if (this.subdomain) {
      return this.subdomain;
    }
    return this.setSubDomain();
  }

  setDevSubDomain(subdomain: string) {
    this.subdomain = subdomain;
  }

  hasSlack() {
    this.getSubDomain();
    return (slacks.indexOf(this.subdomain) !== -1);
  }

  hasRocketChat() {
    this.getSubDomain();
    return (rocketchats.indexOf(this.subdomain) !== -1);
  }

  getSlackSubDomain() {
    this.getSubDomain();
    return (slacksSubDomains[this.subdomain] ? slacksSubDomains[this.subdomain] : null);
  }

  getRocketChatDomain() {
    this.getSubDomain();
    return (rocketChatDomains[this.subdomain] ? rocketChatDomains[this.subdomain] : null);
  }
}
