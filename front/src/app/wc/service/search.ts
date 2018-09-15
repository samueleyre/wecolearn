import { Injectable } from '@angular/core';
import {Subject, Observable, BehaviorSubject} from 'rxjs';
import { Client } from './../entities/client/entity';
import { Message } from './../entities/message/entity';
import { Thread } from './../entities/thread/entity';
import {ClientService} from "./client";
import {Http, Response} from "@angular/http";
import {LoggedService} from "./logged"


import * as _ from 'lodash';
import {FilterService} from "../../applicativeService/filter/service";
import {IEntity} from "../../applicativeService/entity/interface";
import {LoggerService} from "../../applicativeService/logger/service";
import 'rxjs/add/observable/empty'


@Injectable()
export class SearchService {

  currentFoundClients: Subject<any[]>;
  currentFoundAddress: any[];
  currentSearch: Object;
  public loading: Subject<boolean>;
  public loadingOsm: Subject<boolean>;
  private currentlySearching: boolean = false;

  private setNameForOsm = function(elmnt:any) {
    return elmnt['value'] = elmnt['name'];
  };



  constructor(public ClientService: ClientService,
              protected http: Http,
              private LoggedService: LoggedService,
              private loggerService: LoggerService,

  ) {

    this.currentFoundClients = new BehaviorSubject<any[]>(null);
    // this.currentFoundAddress= new BehaviorSubject<any[]>(null);
    this.currentFoundAddress = [];
    this.loading = new BehaviorSubject<boolean>(false);
    this.loadingOsm = new BehaviorSubject<boolean>(false);
    this.currentSearch = {};

  }

  search( first?: number, max?: number ): Observable<void> {

    /*if (this.currentlySearching) {
      return Observable.empty<void>();
    } else {
      this.currentlySearching = true;
    }*/

    this.loading.next(true);
    // this.loggerService.log("current Search", this['currentSearch'], this.currentSearch.hasOwnProperty("city"));
    if (this.currentSearch.hasOwnProperty("city")) {
      FilterService.addFilter("latitude" , this.currentSearch["city"].latitude);
      FilterService.addFilter("longitude" ,this.currentSearch["city"].longitude);
    }

    if (this.currentSearch.hasOwnProperty("tag") && null !== this.currentSearch['tag'] && "" !== this.currentSearch['tag'] && undefined !== this.currentSearch['tag']) {
      FilterService.addFilter("tag", this.currentSearch['tag']);
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
        FilterService.clear();
        this.currentFoundClients.next(response.json());
        this.loading.next(false);
        this.currentlySearching = false;
      });


  }

  searchOsmNames(name: string) : Observable<Array<any>> { // not used at the moment

    // let Key = "TeFzkpW0MZgyiMhEn5zx"; // todo: In Config File
    let Key = "RjgOREa32n5zWJ7fvEw2"; // todo: In Config File

    let route = "https://geocoder.tilehosting.com/fr/q/";

    name = encodeURI(name);

    let endRoute = ".js?key="+Key;

    return this.http.get(`${route}${name}${endRoute}`).map((response)=>{
      console.log(response)
      this.currentFoundAddress = response.json();

      let citys = response.json().results;
      console.log(citys)
      citys.map(this.setNameForOsm);

      return citys;

    });

  }

  getCurrentFoundClients(): Observable<any[]> {
    return this.currentFoundClients.asObservable();
  }

  getCurrentFoundAddress(): any[] {
    return this.currentFoundAddress;
  }


  getLoading(type:string): Observable<boolean>{
    switch (type) {
      case 'tag':
        return this.loading.asObservable();


    }
  }


  addSearchParameter(key:string, value: any) {

    // console.log("addSearchParameter", key, value)
    this.currentSearch[key] = value;
    // console.log("current Search", this['currentSearch']);

  }
}
