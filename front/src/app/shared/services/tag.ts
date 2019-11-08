import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Tag } from '../entities/tag/entity';


@Injectable()
export class TagService {
  constructor(protected http: HttpClient) {}

  public findTags(text?:string): Observable<string[]> {
    let filter = '';
    if (text) {
      filter = `?tagLetters=${text}`;
    }
    return this.http.get(`/api/findTag${filter}`).pipe(map((tags: any) => {
      if (null !== text && '' !== text && 0 === this.findTextInTags(text, tags).length) {
        tags.unshift(new Tag({ name: text }));
      }

      return tags.map((obj:any) => {
        return obj.name;
      });
    }));
  }

  private findTextInTags(text: string, tags: any) {
    return tags.filter(obj => obj.name.includes(text));
  }
}
