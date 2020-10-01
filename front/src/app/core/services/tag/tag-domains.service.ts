import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

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

  get tagDomains$(): Observable<TagDomain[]> {
    return this.entities$;
  }

  findTagDomains(literal?: string): Observable<TagDomain[]> {
    return this.list({ literal: literal ? literal : null });
  }

  /**
   * for search bar
   */
  getPopularDomains(): Observable<TagDomain[]> {
    this._loading$.next(true);
    return this._http.get(`${this.endPoint}s-popular`)
      .pipe(
        tap((data: TagDomain[]) => {
          this._entities$.next(data);
          this._loaded$.next(true);
        }),
        finalize(() => {
          this._loading$.next(false);
        }),
      );
  }
}
