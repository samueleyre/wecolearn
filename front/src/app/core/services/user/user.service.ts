import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '~/core/entities/user/entity';
import { APIService } from '~/core/services/crud/api';

/*
This service is used to manage the data of the all users
 */

@Injectable({
  providedIn: 'root',
})
export class UserService extends APIService<User> {
  public endPoint = '/api/user';

  constructor(protected _http: HttpClient) {
    super(_http);
  }
}
