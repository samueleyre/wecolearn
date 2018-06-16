import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import {Http, Response} from "@angular/http";


import * as _ from 'lodash';
import {FilterService} from "../../applicativeService/filter/service";



@Injectable()
export class TagService {


  constructor(protected http: Http) {

  }


  public findTags(text:string): Observable<Array<String>> {


    return this.http.get(`/api/findTag?tagLetters=`+text).map((response: Response) => {

      let tags = response.json();

      return tags.map(function(obj:any) {
        return obj.name;
      });

    });

  }


}
