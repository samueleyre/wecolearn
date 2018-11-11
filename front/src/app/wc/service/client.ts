
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Subject, Observable, Subscriber} from 'rxjs';
import { User } from '../entities/user/entity';
import {Http, Response} from "@angular/http";
import {HttpClient} from "@angular/common/http";

import {IEntity} from "../../applicativeService/entity/interface";
import {Message} from "../entities/message/entity";
import {LoggerService} from "../../applicativeService/logger/service";
import {Logged} from "../../applicativeService/authguard/logged";


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
    Logged.get().subscribe( (logged:boolean) => {
      if (logged) {
        this.load().subscribe();
      }
    });
    if (null === this.currentClientStatic) {
      return this.currentClientSubject.asObservable();
    } else {
      this.loggerService.log("get client static", this['currentClientStatic'])
      return new Observable<User>((subscriber: Subscriber<User>) => subscriber.next(this['currentClientStatic']));
    }
  }

  patch(client: User) {
    client = this.filterPatch(client);
    return this.http.patch(`/api/client`, client)
  }

  filterPatch(client: User) {
    client.received_messages = [];
    client.messages = [];
    client.sent_messages = [];
    return client;
  }


  pull(): Observable<object>  { // TODO : probably check for any kind of update, if other
    return this.http.get('/api/checknewmessage');
  }

  changeParameter(data: object): Observable<any> {
    return this.http.post('/api/client/changesettings', data);
  }


  load(): Observable<void>  {
    return this.http.get(`${this.endpoint}`).pipe(
        map((response: User) => {
          this.currentClientSubject.next(response);
          this.currentClientStatic = response;
        }));

  }

  getSlackAccount(client: User, type: string) {
   let slackAccount =  ([] !== client.slack_accounts) ? client.slack_accounts.find((slack_account)=> slack_account.slack_team.type === type) : null;
   return ( undefined !== slackAccount ) ? slackAccount.account_id : null;
  }

  deleteAccount(): Observable<object> {
    return this.http.get(`${this.endpoint}/delete`);
  }

}
