import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnBoardingMobileService {
  formTabSelection = new BehaviorSubject(0);

  constructor() { }

  changedSelection(val: number) {
    this.formTabSelection.next(val);
  }
}
