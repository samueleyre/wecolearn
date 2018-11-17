import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Subject, Observable, BehaviorSubject} from 'rxjs';
import {ClientService} from './client';
import {HttpClient} from '@angular/common/http';
import {LoggedService} from './logged';
import * as _ from 'lodash';
import {FilterService} from '../applicativeService/filter/service';
import {LoggerService} from '../applicativeService/logger/service';



@Injectable()
export class SearchService {

  currentFoundClients: Subject<any[]>;
  currentFoundAddress: any[];
  currentSearch: Object;
  public loading: Subject<boolean>;
  public loadingOsm: Subject<boolean>;
  private currentlySearching: boolean = false;
  private pauseRedirect:boolean = false;

  private setNameForOsm = function(elmnt:any) {
    return elmnt['value'] = elmnt['name'];
  };



  constructor(public ClientService: ClientService,
              protected http: HttpClient,
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

  search( first?: number, max?: number ): Observable<boolean> {

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

    return this.http.get(`${route}${params}`).pipe(
      map((response: any[]) => {
        this.currentFoundClients.next(response);
        this.loading.next(false);
        this.currentlySearching = false;
        FilterService.clear();
        if (this.pauseRedirect) {
          this.pauseRedirect = false;
          return false;
        }
        return true;
      }));


  }

  cancelChangePageAfterSearch() {

    if (this.currentlySearching) {
      this.pauseRedirect = true;
    }

  }

  searchOsmNames(name: string) : Observable<Array<any>> { // not used at the moment

    // let Key = "TeFzkpW0MZgyiMhEn5zx"; // todo: In Config File
    let Key = "RjgOREa32n5zWJ7fvEw2"; // todo: In Config File

    let route = "https://geocoder.tilehosting.com/fr/q/";

    name = encodeURI(name);

    let endRoute = ".js?key="+Key;

    return this.http.get(`${route}${name}${endRoute}`).pipe(map((response:any[])=>{
      // console.log(response)
      this.currentFoundAddress = response;

      let citys = response['results'];
      // console.log(citys)
      citys.map(this.setNameForOsm);

      return citys;

    }));

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
