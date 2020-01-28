import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '~/core/entities/user/entity';

// todo: refactor this !

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private currentClientSubject = new Subject<User>();
  private currentClientObservable = this.currentClientSubject.asObservable();
  private endpoint: string;
  private currentClientStatic: User = null;


  constructor(protected http: HttpClient) {
    this.endpoint = '/api/profile';
  }

  getCli(): User {
    return this.currentClientStatic;
  }

  get(): Observable<User> {
    if (null === this.currentClientStatic) {
      return this.currentClientObservable;
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


  /**
   * Update userNotified entry for user
   */
  public userNotified(): Observable<object> {
    return this.http.get('/api/user/notified');
  }
}
