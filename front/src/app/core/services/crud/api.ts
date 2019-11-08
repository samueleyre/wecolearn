import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class APIService<T> {
  public endPoint;

  constructor(private http: HttpClient) {}

  get(filters: {} = {}, slash: string = ''): Observable<T> {
    const params = this.getUrlParams(filters, slash);
    return <any>this.http.get(`${this.endPoint}${params}`);
  }

  list(filters: {} = {}, slash: string = ''): Observable<T[]> {
    const params = this.getUrlParams(filters, slash);
    return <any>this.http.get(`${this.endPoint}s${params}`);
  }

  patch(entity: T): Observable<T> {
    return <any>this.http.patch(`${this.endPoint}`, entity);
  }

  post(entity: T): Observable<T> {
    return <any>this.http.post(`${this.endPoint}`, entity);
  }

  delete(id: number): Observable<T> {
    return <any>this.http.delete(`${this.endPoint}/${id}`);
  }

  getAndList(filters: {} = {}, slash: string = ''): Observable<T[]> {
    const params = this.getUrlParams(filters, slash);
    return <any>this.http.get(`${this.endPoint}${params}`).pipe(
      switchMap(() => <any>this.http.get(`${this.endPoint}s`)),
    );
  }

  postAndList(entity: any): Observable<T[]> {
    return <any>this.http.post(`${this.endPoint}`, entity).pipe(
      switchMap(() => <any>this.http.get(`${this.endPoint}s`)),
    );
  }

  patchAndList(entity: any): Observable<T[]> {
    return <any>this.http.patch(`${this.endPoint}`, entity).pipe(
      switchMap(() => <any>this.http.get(`${this.endPoint}s`)),
    );
  }

  deleteAndList(id: any): Observable<T[]> {
    return <any>this.http.delete(`${this.endPoint}/${id}`).pipe(
      tap((response) => {
        if (!('success' in response)) {
          throw Error();
        }
      }),
      switchMap(() => <any>this.http.get(`${this.endPoint}s`)),
    );
  }

    /* Privates */

  private getUrlParams (filters: {} = {}, slash: string = '') {
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
