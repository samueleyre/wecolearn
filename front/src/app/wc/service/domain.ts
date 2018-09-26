
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
    if (process.env.NODE_ENV === 'production') {
      var regex = /(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i;
      var subdomain = location.match(regex)[1];
      // console.log(subdomain, subdomains.indexOf(subdomain))
      if (null !== subdomain && "www" !== subdomain &&  subdomains.indexOf(subdomain) !== -1 ) {
        this.subdomain = subdomain;
        return subdomain;
      } else {
        this.subdomain = "main";
        return subdomain;
      }

    } else {
      this.subdomain = "main";
      return "main";
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
