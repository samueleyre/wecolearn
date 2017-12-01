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

  search(): Observable<void> {

    let params = FilterService.getUrlParams();

    return this.http.get(`/api/search${params}`)
      .map((response: Response) => {
        this.currentFoundClients = response.json();
        return;
      });

  }

  autoLoad(): Observable<Array<Client>> {

    return this.http.get('/api/client/matchs')
      .map((response: Response) => {
        this.currentFoundClients = response.json();
        return response.json();
      });

  }


}