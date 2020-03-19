import { finalize, map, tap } from 'rxjs/operators';
import { Injectable, NgZone } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { APIService } from '~/core/services/crud/api';
import { User } from '~/core/entities/user/entity';
import { SearchMeta } from '~/core/enums/search/searchMeta.enum';
import { Tag } from '~/core/entities/tag/entity';

import { SEARCH } from '../../../modules/search/config/main';

interface ApiResponseInterface {
  meta: any;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService extends APIService<User> {
  private currentlySearching = false;
  private searchInput: BehaviorSubject<Tag> = new BehaviorSubject(null);
  static max = SEARCH.default.max;

  currentFoundClients: Subject<any[]> = new Subject<any[]>();
  currentFoundAddress: any[] = [];
  currentSearch: {} = {};
  public endPoint = '/api/user/matchs';
  public searchMetaSubject: BehaviorSubject<{ [key in SearchMeta]: boolean }> = new BehaviorSubject(null);

  constructor(private _http: HttpClient) {
    super(_http);
  }

  get searchType():string {
    if (SearchService.max !== SEARCH.default.max) {
      return 'scroll';
    }
    return 'default';
  }

  get searchMeta(): { [key in SearchMeta]: boolean } {
    return this.searchMetaSubject.value;
  }

  private resetMax():void {
    SearchService.max = SEARCH.default.max;
  }

  get searchInputValue(): Tag | null {
    return this.searchInput.value;
  }

  getSearchInputObs(): Observable<Tag> {
    return this.searchInput;
  }

  setSearchInput(tag: Tag): void {
    this.searchInput.next(tag);
  }

  searchList(filters: {} = {}): Observable<ApiResponseInterface> {
    return this._http.post(this.endPoint, filters)
      .pipe(
        tap((data: ApiResponseInterface) => {
          this._loaded$.next(true);
        }),
        finalize(() => {
          this._loading$.next(false);
        }),
      );
  }

  search(filters: {} = {}): Observable<boolean> {
    if (!filters.hasOwnProperty('max')) {
      this.resetMax();
      filters['max'] = SEARCH.default.max;
    }
    this._loading$.next(true);

    return this.searchList(filters).pipe(
      map((response: ApiResponseInterface) => {
        this.currentFoundClients.next(response.data.map(val => val[0]));
        this.searchMetaSubject.next(response.meta);
        this._loading$.next(false);
        this.currentlySearching = false;
        return true;
      }),
    );
  }

  getCurrentFoundClients(): Observable<any[]> {
    return this.currentFoundClients.asObservable();
  }

  getCurrentFoundAddress(): any[] {
    return this.currentFoundAddress;
  }

  addSearchParameter(key: string, value: any) {
    this.currentSearch[key] = value;
  }

  removeSearchParameter(key: string) {
    delete this.currentSearch[key];
  }
}
