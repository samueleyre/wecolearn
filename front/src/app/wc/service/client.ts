
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../entities/user/entity';
import {Http, Response} from "@angular/http";
import {HttpClient} from "@angular/common/http";

import {IEntity} from "../../applicativeService/entity/interface";
import {Message} from "../entities/message/entity";
import {LoggerService} from "../../applicativeService/logger/service";


@Injectable()
export class ClientService {

  private currentClientSubject = new Subject<User>();
  private endpoint: string;
  private currentClientObservable: Observable<User>;
  private currentClientStatic: User = null; // probably useless


  constructor(protected http : HttpClient, private loggerService: LoggerService) {
      this.endpoint = '/api/client';
  }

  getOb(): any {

    return this.currentClientObservable;

  }

  getCli() : any {
    return this.currentClientStatic;
  }

  get(): Observable<User> {

      return this.currentClientSubject.asObservable();

  }

  patch(client: User) {

    return this.http.patch(`/api/client`, client)

  }


  pull(): Observable<object>  { // TODO : probably check for any kind of update, if other
    return this.http.get('/api/checknewmessage');
  }

  changeParameter(data: object): Observable<any> {
    return this.http.post('/api/client/changesettings', data);
  }


  load(): Observable<string>  {
      return this.http.get(`${this.endpoint}`).pipe(
          map((response: User) => {
              this.currentClientSubject.next(response);
              this.currentClientStatic = response;
              // this.loggerService.log("loaded", response)
              return 'loaded';
          }));
  }

  hasSlackAccount(client: User) {
   return ([] !== client.slack_accounts) ? (undefined !== client.slack_accounts.find((slack_account)=> slack_account.slack_team.type === "slack")) : false;
  }

  deleteAccount(): Observable<object> {
    return this.http.get(`${this.endpoint}/delete`);
  }

}
