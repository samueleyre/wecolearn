import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { APIService } from '~/core/services/crud/api';
import { CommunityEntity } from '~/core/entities/community/community.entity';

@Injectable({
  providedIn: 'root',
})
export class CommunityAdminService extends APIService<CommunityEntity>{
  public endPoint = '/api/community-admin/community';
  constructor(private _http: HttpClient) {
    super(_http);
  }

  get community$(): Observable<CommunityEntity> {
    return this.entity$.pipe(filter(val => !!val));
  }

  generateNewInviteToken(): Observable<CommunityEntity> {
    return this._http.get('/api/community-admin/generateNewInviteUrl').pipe(
      switchMap(() => this.get()),
    );
  }
}
