import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIService } from '~/core/services/crud/api';
import { CommunityEntity } from '~/core/entities/community/community.entity';

@Injectable({
  providedIn: 'root',
})
export class AdminCommunityService extends APIService<CommunityEntity>{
  public endPoint = '/api/admin/domain';
  constructor(private _http: HttpClient) {
    super(_http);
  }

  createAndList(domain: CommunityEntity): Observable<CommunityEntity[]> {
    return this.postAndList(domain);
  }

  get communities$() {
    return this.entities$;
  }

}
