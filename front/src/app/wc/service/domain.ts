
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {Http, Response} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";

import {IEntity} from "../../applicativeService/entity/interface";
import {Message} from "../entities/message/entity";
import {LoggerService} from "../../applicativeService/logger/service";
import {subdomains} from "../../applicativeService/constants/domain";
import {rocketchats, slacks, slacksSubDomains, rocketChatDomains} from "../../applicativeService/constants/slack";


@Injectable()
export class DomainService {

  private subdomain:string;
  private location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  setSubDomain() {
    let subdomain = null;
    if (process.env.NODE_ENV === 'production') {
      const location = window.location.href;
      const regex = /(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i;

      // console.log(subdomain, subdomains.indexOf(subdomain))
      if (location.match(regex) && location.match(regex)[1]) {
        subdomain = location.match(regex)[1];
      } else {
        return this.subdomain = "wecolearn";
      }

      if (null !== subdomain && "www" !== subdomain &&  subdomains.indexOf(subdomain) !== -1 ) {
        this.subdomain = subdomain;
        return subdomain;
      } else {
        return this.subdomain = "wecolearn";
      }


    } else {
      if (!this.subdomain) {
        return this.subdomain = "lesbricodeurs";
      }
    }

  }

  getSubDomain() {
    if (this.subdomain) {
      return this.subdomain;
    } else {
      return this.setSubDomain();
    }
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
    return ( slacksSubDomains[this.subdomain] ? slacksSubDomains[this.subdomain] : null );
  }

  getRocketChatDomain() {
    this.getSubDomain();
    return ( rocketChatDomains[this.subdomain] ? rocketChatDomains[this.subdomain] : null );
  }

}
