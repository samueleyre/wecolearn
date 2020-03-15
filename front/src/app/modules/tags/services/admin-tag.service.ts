import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  mergeAndList(oldTag: Tag, mergedTag: Tag): Observable<Tag[]> {
    return this._http.post(`${this.endPoint}Merge`, { oldId: oldTag.id, mergedId: mergedTag.id }).pipe(
      switchMap(() => this.list()),
    );
  }

  get tags$() {
    return this.entities$;
  }
}
