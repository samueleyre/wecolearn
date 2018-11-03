
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Tag } from './../entities/tag/entity';

import {HttpClient} from "@angular/common/http";


import * as _ from 'lodash';
import {FilterService} from "../../applicativeService/filter/service";



@Injectable()
export class TagService {


  constructor(protected http: HttpClient) {

  }


  public findTags(text:string): Observable<Array<String>> {


    return this.http.get(`/api/findTag?tagLetters=`+text).pipe(map((tags: any) => {

      tags.unshift(new Tag(null, text))

      return tags.map(function(obj:any) {
        return obj.name;
      });

    }));

  }


}
