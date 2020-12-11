import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class APIService<T> {
  public endPoint;

  protected _entities$ = new BehaviorSubject<T[]>([]);
  protected _entity$ = new BehaviorSubject<T>(null);

  protected _loading$ = new BehaviorSubject<boolean>(false);
  protected _loaded$ = new BehaviorSubject<boolean>(false);


  // ===== Get ======
  get entities$(): Observable<T[]> {
    return this._entities$;
  }

  get entities(): T[] {
    return this._entities$.value;
  }

  get entity$(): Observable<T> {
    return this._entity$;
  }

  get entity(): T {
    return this._entity$.value;
  }

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get loading(): boolean {
    return this._loading$.value;
  }

  get loaded(): boolean {
    return this._loaded$.value;
  }

  constructor(private http: HttpClient) {}

  get(filters: {} = {}, slash: string = ''): Observable<T> {
    const params = this.getUrlParams(filters, slash);
    this._loading$.next(true);
    return this.http.get(`${this.endPoint}${params}`)
      .pipe(
        tap((data: T) => {
          this._entity$.next(data);
          this._loaded$.next(true);
        }),
        finalize(() => {
          this._loading$.next(false);
        }),
      );
  }

  list(filters: {} = {}, slash: string = ''): Observable<T[]> {
    const params = this.getUrlParams(filters, slash);
    this._loading$.next(true);
    return this.http.get(`${this.endPoint}s${params}`)
      .pipe(
        tap((data: T[]) => {
          this._entities$.next(data);
          this._loaded$.next(true);
        }),
        finalize(() => {
          this._loading$.next(false);
        }),
      );
  }

  patch(entity: T): Observable<T> {
    this._loading$.next(true);
    return this.http.patch(`${this.endPoint}`, entity)
      .pipe(
        tap((data: T) => {
          this._entity$.next(data);
          this._loaded$.next(true);
        }),
        finalize(() => {
          this._loading$.next(false);
        }),
      );
  }

  post(entity: T): Observable<T> {
    this._loading$.next(true);
    return this.http.post(`${this.endPoint}`, entity)
      .pipe(
        tap((data: T) => {
          this._entity$.next(data);
          this._loaded$.next(true);
        }),
        finalize(() => {
          this._loading$.next(false);
        }),
      );
  }

  delete(id: number): Observable<void> {
    this._loading$.next(true);
    return <any>this.http.delete(`${this.endPoint}/${id}`)
      .pipe(
        tap((data: T) => {
          this._entity$.next(null);
          this._loaded$.next(true);
        }),
        finalize(() => {
          this._loading$.next(false);
        }),
      );
  }

  postAndList(entity: any): Observable<T[]> {
    this._loading$.next(true);
    return this.http.post(`${this.endPoint}`, entity).pipe(
      switchMap(() => this.list()),
    );
  }

  patchAndList(entity: any): Observable<T[]> {
    this._loading$.next(true);
    return this.http.patch(`${this.endPoint}`, entity).pipe(
      switchMap(() => this.list()),
    );
  }

  // putAndList(params: any): Observable<T[]> {
  //   return this.http.put(`${this.endPoint}`, params).pipe(
  //     switchMap(() => this.list()),
  //   );
  // }

  deleteAndList(id: any): Observable<T[]> {
    this._loading$.next(true);
    return this.http.delete(`${this.endPoint}/${id}`).pipe(
      switchMap(() => this.list()),
    );
  }

    /* Privates */

  protected getUrlParams (filters: {} = {}, slash: string = '') {
    let sep = '?';
    let ret = '';
    if (slash !== '') {
      ret += '/' + slash;
    }
    for (const field in filters) {
      if (null !== filters[field]) {
        ret += `${sep}${field}=${filters[field]}`;
        sep = '&';
      }
    }
    return ret;
  }
}
