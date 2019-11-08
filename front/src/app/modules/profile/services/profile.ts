import { Injectable } from '@angular/core';

import { APIService } from '~/shared/services/crud/api';


@Injectable()
export class ProfileService extends APIService {
  public endPoint = '/api/profile';
}
