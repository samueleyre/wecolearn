
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from './../entities/client/entity';
import {Http, Response} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";

import {IEntity} from "../../applicativeService/entity/interface";
import {Message} from "../entities/message/entity";
import {LoggerService} from "../../applicativeService/logger/service";
import {subdomains} from "../../applicativeService/constants/domain";


@Injectable()
export class DomainService {

  private subdomain:string;
  private location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  setSubDomain() {
    const location = window.location.href;
    let subdomain = null;
    if (process.env.NODE_ENV === 'production') {
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
      return this.subdomain = "wecolearn";
    }

  }

  getSubDomain() {
    if (this.subdomain) {
      return this.subdomain;
    } else {
      return this.setSubDomain();
    }
  }


}
