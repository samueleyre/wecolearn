import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIService } from '~/core/services/crud/api';
import { Tag } from '~/core/entities/tag/entity';

@Injectable({
  providedIn: 'root',
})
export class AdminTagService extends APIService<Tag>{
  public endPoint = '/api/admin/tag';
  constructor(private _http: HttpClient) {
    super(_http);
  }

  createAndList(tag: Tag): Observable<Tag[]> {
    return this.postAndList(tag);
  }

  get tags$() {
    return this.entities$;
  }
}
