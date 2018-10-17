
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from './../entities/client/entity';
import {Http, Response} from "@angular/http";
import {HttpClient} from "@angular/common/http";

import {IEntity} from "../../applicativeService/entity/interface";
import {Message} from "../entities/message/entity";
import {LoggerService} from "../../applicativeService/logger/service";


@Injectable()
export class ClientService {

  private currentClient = new Subject<Client>();
  private endpoint: string;
  private cClientOb: Observable<Client>;
  private cClientNu: Client = null;


  constructor(protected http : HttpClient, private loggerService: LoggerService) {
      this.endpoint = '/api/client';
  }

  getOb(): any {

    return this.cClientOb;

  }

  getCli() : any {
    return this.cClientNu;
  }

  get(api : boolean = false): Observable<Client> {

      return this.currentClient.asObservable();

  }

  pull(): Observable<object>  { // TODO : probably check for any kind of update, if other
    return this.http.get('/api/checknewmessage');
  }

  changeParameter(data: object): Observable<any> {
    return this.http.post('/api/client/changesettings', data);
  }


  load(): Observable<string>  {
      return this.http.get(`${this.endpoint}`).pipe(
          map((response: Client) => {
              this.currentClient.next(response);
              this.cClientNu = response;
              // this.loggerService.log("loaded", response)
              return 'loaded';
          }));
  }

  deleteAccount(): Observable<object> {
    return this.http.get(`${this.endpoint}/delete`);
  }

}
