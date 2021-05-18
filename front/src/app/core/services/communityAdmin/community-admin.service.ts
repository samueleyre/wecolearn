import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { APIService } from '~/core/services/crud/api';
import { Community } from '~/core/entities/domain/community';

@Injectable({
  providedIn: 'root',
})
export class CommunityAdminService extends APIService<Community>{
  public endPoint = '/api/community-admin/community';
  constructor(private _http: HttpClient) {
    super(_http);
  }

  get community$(): Observable<Community> {
    return this.entity$.pipe(filter(val => !!val));
  }

  generateNewInviteToken(): Observable<Community> {
    return this._http.get('/api/community-admin/generateNewInviteUrl').pipe(
      switchMap(() => this.get()),
    );
  }
}
