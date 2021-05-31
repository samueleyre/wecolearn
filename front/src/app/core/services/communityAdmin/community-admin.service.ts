import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { APIService } from '~/core/services/crud/api';
import { CommunityEntity } from '~/core/entities/community/community.entity';
import { ENDPOINTS } from '~/config/api/end-points.const';

@Injectable({
  providedIn: 'root',
})
export class CommunityAdminService extends APIService<CommunityEntity>{
  public endPoint = ENDPOINTS.communityAdmin.community;
  constructor(private _http: HttpClient) {
    super(_http);
  }

  get community$(): Observable<CommunityEntity> {
    return this.entity$.pipe(filter(val => !!val));
  }

  generateNewInviteToken(): Observable<CommunityEntity> {
    return this._http.get(ENDPOINTS.communityAdmin.generateInviteUrl).pipe(
      switchMap(() => this.get()),
    );
  }
}
