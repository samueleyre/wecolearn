import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from './../entities/client/entity';
import { Message } from './../entities/message/entity';
import { Thread } from './../entities/thread/entity';
import {ClientService} from "./client";
import {Http, Response} from "@angular/http";


import * as _ from 'lodash';
import {FilterService} from "../../applicativeService/filter/service";
import {IEntity} from "../entity/interface";



@Injectable()
export class SearchService {

  currentFoundClients: Observable<Message[]>;
  currentSearch: Object;


  constructor(public ClientService: ClientService, protected http: Http) {

    this.currentSearch = {};
  }

  search( first?: number, max?: number ): Observable<Array<Client>> {



    console.log("current Search", this['currentSearch'], this.currentSearch.hasOwnProperty("city"));
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
    return this.http.get(`/api/search${params}`)
      .map((response: Response) => {
        this.currentFoundClients = response.json();
        return response.json();
      });

  }

  autoLoad(): Observable<Array<Client>> {

    /*
    api utilisée pour le match en fonction du profil lors du chargement.
    */
    return this.http.get('/api/client/matchs')
      .map((response: Response) => {
        this.currentFoundClients = response.json();
        return response.json();
      });
  }

  addSearchParameter(key:string, value: any) {

    // console.log("addSearchParameter", key, value)
    this.currentSearch[key] = value;
    // console.log("current Search", this['currentSearch']);



  }
}
