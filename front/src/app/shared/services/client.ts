import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '~/shared/entities/user/entity';


@Injectable()
export class ClientService {
  private currentClientSubject = new Subject<User>();
  private endpoint: string;
  private currentClientStatic: User = null; // probably useless


  constructor(protected http: HttpClient) {
    this.endpoint = '/api/client';
  }

  getCli(): any {
    return this.currentClientStatic;
  }

  get(): Observable<User> {
    if (null === this.currentClientStatic) {
      return this.currentClientSubject.asObservable();
    }
    return new Observable<User>((subscriber: Subscriber<User>) => subscriber.next(this['currentClientStatic']));
  }

  set(user): void {
    this.currentClientStatic = user;
    this.currentClientSubject.next(user);
  }


  filterPatch(client: User) {
    client.received_messages = [];
    client.messages = [];
    client.sent_messages = [];
    return client;
  }


  pull(): Observable<object> { // TODO : probably check for any kind of update, if other
    return this.http.get('/api/messages/new');
  }

  changeParameter(data: object): Observable<any> { // TODO: this should be a put
    return this.http.post('/api/client/changesettings', data);
  }


  load(): Observable<User> {
    return this.http.get(`${this.endpoint}`).pipe(
        map((response: User) => {
          this.set(response);
          return response;
        }));
  }

  patch(client: User) {
    const cleanedClient = this.filterPatch(client);
    return this.http.patch(`${this.endpoint}`, cleanedClient).pipe(map((patchedClient: User) => {
      this.set(patchedClient);
      return patchedClient;
    }));
  }

  getSlackAccount(client: User, type: string) {
    const slackAccount = ([] !== client.slack_accounts) ? client.slack_accounts.find(account => account.slack_team.type === type) : null;
    return (undefined !== slackAccount) ? slackAccount.account_id : null;
  }

  deleteAccount(): Observable<object> {
    return this.http.get(`${this.endpoint}/delete`);
  }

  /**
   * Update userNotified entry for user
   */
  public userNotified(): Observable<object> {
    return this.http.get('/api/client/notified');
  }
}
