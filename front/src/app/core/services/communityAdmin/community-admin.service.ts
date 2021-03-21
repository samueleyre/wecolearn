import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

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
}
