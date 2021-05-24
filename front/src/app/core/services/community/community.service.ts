import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  public endPoint = '/api/community';

  constructor(private _http: HttpClient) {
  }

  public joinLink(token: string): Observable<any> {
    return this._http.get(`${this.endPoint}/invite/${token}`);
  }
}
