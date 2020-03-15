import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIService } from '~/core/services/crud/api';
import { TagDomain } from '~/core/entities/tag/TagDomain';

@Injectable({
  providedIn: 'root',
})
export class TagDomainsService extends APIService<TagDomain>{
  public endPoint = '/api/tag/domain';
  constructor(private _http: HttpClient) {
    super(_http);
  }

  findTagDomains(literal: string): Observable<TagDomain[]> {
    return this.list({ literal });
  }
}
