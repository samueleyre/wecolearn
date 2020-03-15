import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIService } from '~/core/services/crud/api';
import { TagDomain } from '~/core/entities/tag/TagDomain';

@Injectable({
  providedIn: 'root',
})
export class AdminTagDomainService extends APIService<TagDomain>{
  public endPoint = '/api/admin/tagDomain';
  constructor(private _http: HttpClient) {
    super(_http);
  }

  get tags$() {
    return this.entities$;
  }
}
