import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { APIService } from '~/core/services/crud/api';
import { User } from '~/core/entities/user/entity';


@Injectable()
export class ProfileService extends APIService<User> {
  public endPoint = '/api/profile';

  constructor(private _http: HttpClient) {
    super(_http);
  }

  changeParameter(data: object): Observable<any> { // TODO: this should be a put
    return this._http.post('/api/user/changesettings', data);
  }

  deleteAccount(): Observable<object> {
    return this.get(`${this.endPoint}/delete`);
  }
}
