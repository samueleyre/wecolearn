import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CleanService {
  public cleanObject(obj: any): any {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
    return obj;
  }
}
