import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

import { APIService } from '~/core/services/crud/api';

import { Tag } from '../../entities/tag/entity';


@Injectable({
  providedIn: 'root',
})
export class PopularTagDomainsAsTagsService extends APIService<Tag> {
  public endPoint = '/api/tag/domains-popular-as-tag';
  constructor(private _http: HttpClient) {
    super(_http);
  }

  /**
   * for tag selection in profil
   */
  getPopularDomainsAsTags(limit: number): Observable<Tag[]> {
    return super.list({ limit });
  }
}
