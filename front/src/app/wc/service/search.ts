import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from './../entities/client/entity';
import { Message } from './../entities/message/entity';
import { Thread } from './../entities/thread/entity';
import {ClientService} from "./client";
import {Http, Response} from "@angular/http";


import * as _ from 'lodash';
import {FilterService} from "../../applicativeService/filter/service";



@Injectable()
export class SearchService {

  currentFoundClients: Observable<Message[]>;


  constructor(public ClientService: ClientService, protected http: Http) {

  }

  search( first?: number, max?: number ): Observable<Array<Client>> {

    let params = FilterService.getUrlParams();

    if( typeof first == 'undefined') {
      first = 0;
    }

    if( typeof max == 'undefined') {
      max = 10;
    }

    /*
    api de recherche utilisée dans l'infinite scroll
    de la barre de recherche.
    */
    return this.http.get(`/api/search${params}?first=${first}&max=${max}`)
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
}
