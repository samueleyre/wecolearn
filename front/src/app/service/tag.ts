import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../entities/tag/entity';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class TagService {


  constructor(protected http: HttpClient) {}


  public findTags(text:string): Observable<Array<String>> {


    return this.http.get(`/api/findTag?tagLetters=`+text).pipe(map((tags: any) => {
      if (null !== text && '' !== text && 0 === this.findTextInTags(text, tags).length )
        tags.unshift(new Tag(null, text));

      return tags.map(function(obj:any) {
        return obj.name;
      });

    }));

  }

  private findTextInTags(text: string, tags: any) {

    return tags.filter(obj => obj.name.includes(text));

  }


}
