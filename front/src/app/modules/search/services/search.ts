import { finalize, map, tap } from 'rxjs/operators';
import { Injectable, NgZone } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { city } from '~/config/city';
import { APIService } from '~/core/services/crud/api';
import { User } from '~/core/entities/user/entity';

import { SEARCH } from '../config/main';

interface ApiResponseInterface {
  meta: any;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService extends APIService<User> {
  private currentlySearching = false;
  private pauseRedirect = false;
  private searchInput: BehaviorSubject<string> = new BehaviorSubject('');
  static max = SEARCH.default.max;

  currentFoundClients: Subject<any[]> = new Subject<any[]>();
  currentFoundAddress: any[] = [];
  currentSearch: {} = {};
  public endPoint = '/api/user/match';

  constructor(private _http: HttpClient) {
    super(_http);
  }

  get searchType():string {
    if (SearchService.max !== SEARCH.default.max) {
      return 'scroll';
    }
    return 'default';
  }
  private resetMax():void {
    SearchService.max = SEARCH.default.max;
  }

  getSearchInput(): Observable<string> {
    return this.searchInput;
  }

  setSearchInput(tag: string): void {
    this.searchInput.next(tag);
  }

  searchList(filters: {} = {}, slash: string = ''): Observable<ApiResponseInterface> {
    const params = this.getUrlParams(filters, slash);
    return this._http.get(`${this.endPoint}s${params}`)
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

    if (!filters['latitude'] || !filters['longitude']) {
      filters['latitude'] = city.default.latitude;
      filters['longitude'] = city.default.longitude;
    }

    return this.searchList(filters).pipe(
      map((response: ApiResponseInterface) => {
        this.currentFoundClients.next(response.data.map(val => val[0]));
        this._loading$.next(false);
        this.currentlySearching = false;
        return true;
      }));
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
