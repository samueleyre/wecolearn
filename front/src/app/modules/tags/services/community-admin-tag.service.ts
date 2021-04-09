import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { Tag } from '~/core/entities/tag/entity';

@Injectable({
  providedIn: 'root',
})
export class CommunityAdminTagService {
  constructor(private _http: HttpClient) {}

  protected _entities$ = new BehaviorSubject<any>([]);
  protected _loaded$ = new BehaviorSubject<boolean>(false);
  protected _loading$ = new BehaviorSubject<boolean>(false);

  get(id) {
    return this._http.get(`/api/community-admin/tags-in-community/${id}`)
      .pipe(
        tap((data) => {
          this._entities$.next(data);
          this._loaded$.next(true);
        }),
        finalize(() => {
          this._loading$.next(false);
        }),
      );
  }

  get tagsInCommunity$(): Observable<Tag[]> {
    return this._entities$;
  }
}
