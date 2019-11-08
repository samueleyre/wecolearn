import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIService } from '~/core/services/crud/api';
import { User } from '~/core/entities/user/entity';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends APIService<User>{
  constructor(private _http: HttpClient) {
    super(_http);
  }

  createAndList(user: User): Observable<User[]> {
    return this.postAndList(user);
  }
}
