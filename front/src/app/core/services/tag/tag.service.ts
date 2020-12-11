import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';

import { Tag } from '../../entities/tag/entity';


@Injectable({
  providedIn: 'root',
})
export class TagService {
  public endPoint = '/api/tag';
  constructor(private _http: HttpClient) {}

  public findTags(text?:string, type: TagTypeEnum = 0): Observable<Tag[]> {
    let filter = '';
    if (text) {
      filter = `?tagLetters=${text}&type=${type}`;
    }
    return <Observable<Tag[]>>this._http.get(`${this.endPoint}/find${filter}`);
  }
}
