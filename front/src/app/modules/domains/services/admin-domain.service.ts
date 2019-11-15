import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIService } from '~/core/services/crud/api';
import { Domain } from '~/core/entities/domain/domain';

@Injectable({
  providedIn: 'root',
})
export class AdminDomainService extends APIService<Domain>{
  public endPoint = '/api/admin/domain';
  constructor(private _http: HttpClient) {
    super(_http);
  }

  createAndList(domain: Domain): Observable<Domain[]> {
    return this.postAndList(domain);
  }

  get domains$() {
    return this.entities$;
  }}
