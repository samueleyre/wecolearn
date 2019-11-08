import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from '~/shared/entities/user/entity';
import { APIService } from '~/shared/services/crud/api';

@Injectable()
export class UserService extends APIService {
  private endpoint = '/api/users';

  postNewUser(user: User): Observable<any> {
    return this.http.post('/api/newuser', user)
      .map((response: any) => response);
  }
}
