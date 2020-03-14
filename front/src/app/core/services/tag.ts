import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Tag } from '../entities/tag/entity';


@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(protected http: HttpClient) {}

  public findTags(text?:string): Observable<Tag[]> {
    let filter = '';
    if (text) {
      filter = `?tagLetters=${text}`;
    }
    return <Observable<Tag[]>>this.http.get(`/api/tag/find${filter}`);
  }
}
