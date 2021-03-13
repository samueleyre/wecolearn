import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIService } from '~/core/services/crud/api';
import { Community } from '~/core/entities/domain/community';

@Injectable({
  providedIn: 'root',
})
export class AdminCommunityService extends APIService<Community>{
  public endPoint = '/api/admin/domain';
  constructor(private _http: HttpClient) {
    super(_http);
  }

  createAndList(domain: Community): Observable<Community[]> {
    return this.postAndList(domain);
  }

  get communities$() {
    return this.entities$;
  }

}
