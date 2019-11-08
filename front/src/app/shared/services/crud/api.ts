import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class APIService {
  public endPoint;

  constructor(public http: HttpClient) {}

  get(filters: {} = {}, slash: string = ''): Observable<any> {
    const params = this.getUrlParams(filters, slash);
    return this.http.get(`${this.endPoint}${params}`).map((response: any) => response);
  }

  getOne(filters: {} = {}): Observable<any> {
    const params = this.getUrlParams(filters);
    return this.http.get(`${this.endPoint}${params}`).map((response: any) => response);
  }

  patch(entity: any): Observable<any> {
    return this.http.patch(`${this.endPoint}`, entity).map((response: any) => response);
  }

  patchOne(entity: any): Observable<any> {
    return this.http.patch(`${this.endPoint}`, entity).map((response: any) => response);
  }

  post(entity: any): Observable<any> {
    return this.http.post(`${this.endPoint}`, entity);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.endPoint}/${id}`);
  }

    /* Privates */

  private getUrlParams(filters: {} = {}, slash: string = '') {
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
