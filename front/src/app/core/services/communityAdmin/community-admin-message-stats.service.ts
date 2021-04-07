import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {StatsInterface} from '~/core/interfaces/stats/stats.interface';

@Injectable({
  providedIn: 'root',
})
export class CommunityAdminMessageStatsService {
  constructor(private _http: HttpClient) {
  }

  protected _entity$ = new BehaviorSubject<any>(null);
  protected _loaded$ = new BehaviorSubject<boolean>(false);
  protected _loading$ = new BehaviorSubject<boolean>(false);

  get(id) {
    return this._http.get(`/api/community-admin/message/stat/${id}`)
      .pipe(
        tap((data) => {
          this._entity$.next(data);
          this._loaded$.next(true);
        }),
        finalize(() => {
          this._loading$.next(false);
        }),
      );
  }

  stats(): Observable<StatsInterface> {
    return this._entity$;
  }
}
