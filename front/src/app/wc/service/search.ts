import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from './../entities/client/entity';
import { Message } from './../entities/message/entity';
import { Thread } from './../entities/thread/entity';
import {ClientService} from "./client";
import {Http, Response} from "@angular/http";
import {LoggedService} from "./logged"


import * as _ from 'lodash';
import {FilterService} from "../../applicativeService/filter/service";
import {IEntity} from "../entity/interface";
import {LoggerService} from "../../applicativeService/logger/service";



@Injectable()
export class SearchService {

  currentFoundClients: Subject<Client[]> = new Subject<Client[]>();
  currentSearch: Object;


  constructor(public ClientService: ClientService,
              protected http: Http,
              private LoggedService: LoggedService,
              private loggerService: LoggerService
  ) {

    this.currentSearch = {};
    // this.currentFoundClients = Observable.empty<Client[]>();
  }

  search( first?: number, max?: number ): Observable<void> {

    this.loggerService.log("current Search", this['currentSearch'], this.currentSearch.hasOwnProperty("city"));
    if (this.currentSearch.hasOwnProperty("city")) {
      FilterService.addFilter("latitude" , this.currentSearch["city"].latitude);
      FilterService.addFilter("longitude" ,this.currentSearch["city"].longitude);
    }


    if( typeof first == 'undefined') {
      first = 0;
    }

    if( typeof max == 'undefined') {
      max = 10;
    }

    FilterService.addFilter("first" ,first);
    FilterService.addFilter("max" ,max);
    let params = FilterService.getUrlParams();
    /*
    api de recherche utilisée dans l'infinite scroll
    de la barre de recherche.
    */

    let logged = this.LoggedService.get();

    let route = "/api/search";

    if (logged) {
      route = "/api/client/matchs";
    }

    return this.http.get(`${route}${params}`)
      .map((response: Response) => {
        this.currentFoundClients.next(response.json());
        return;
        // return response.json();
      });


  }


  addSearchParameter(key:string, value: any) {

    // console.log("addSearchParameter", key, value)
    this.currentSearch[key] = value;
    // console.log("current Search", this['currentSearch']);



  }
}
