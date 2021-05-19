import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { APIService } from '~/core/services/crud/api';
import { User } from '~/core/entities/user/entity';

@Injectable({
  providedIn: 'root',
})
export class CommunityAdminUsersService extends APIService<User>{
  public endPoint = '/api/community-admin/user';
  constructor(private _http: HttpClient) {
    super(_http);
  }

  createAndList(user: User): Observable<User[]> {
    this._loading$.next(true);
    return this._http.post(`${this.endPoint}`, user).pipe(
      tap((patchedUser: User) => this._entity$.next(patchedUser)),
      switchMap(() => this.list()),
    );
  }

  get user() {
    return this.entity;
  }

  get users$() {
    return this.entities$;
  }
}
