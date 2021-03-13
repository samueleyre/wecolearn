import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { APIService } from '~/core/services/crud/api';
import { User } from '~/core/entities/user/entity';
import { UserRoleEnum } from '~/core/enums/user/user-role.enum';
import { UserPutInterface } from '~/core/interfaces/user/user-put.interface';


/*
This service is used to manage the data of the connected user
 */

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends APIService<User> {
  public endPoint = '/api/profile';

  constructor(private _http: HttpClient) {
    super(_http);
  }

  get profile(): User | null {
    return this.entity;
  }

  setProfile(user): void {
    this._entity$.next(user);
  }

  get isAdmin(): boolean {
    return this.profile.roles.includes(UserRoleEnum.ADMIN) || this.profile.roles.includes(UserRoleEnum.SUPER_ADMIN);
  }

  get isSuperAdmin(): boolean {
    return this.profile.roles.includes(UserRoleEnum.SUPER_ADMIN);
  }

  pullMessages(): Observable<object> { // TODO : probably check for any kind of update, if other
    return this._http.get('/api/messages/new');
  }

  put(params: UserPutInterface) {
    return super.put(params);
  }

  changeParameter(data: object): Observable<any> {
    return this._http.post(`${this.endPoint}/changesettings`, data);
  }

  // getSlackAccount(client: User, type: string) {
  //   const slackAccount = ([] !== client.slack_accounts) ? client.slack_accounts.find(account => account.slack_team.type === type) : null;
  //   return (undefined !== slackAccount) ? slackAccount.account_id : null;
  // }

  deleteAccount(): Observable<object> {
    return this._http.get(`${this.endPoint}/delete`);
  }

  // /**
  //  * Update userNotified entry for user
  //  */
  // public userNotified(): Observable<object> {
  //   return this._http.get('/api/user/notified');
  // }
}
