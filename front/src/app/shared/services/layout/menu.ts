import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class MenuService {
  public static menuDisplay: BehaviorSubject<boolean>;


  constructor() {
    MenuService.menuDisplay = new BehaviorSubject<boolean>(false);
  }
  static displayToggle() {
    MenuService.menuDisplay.next(!MenuService.menuDisplay.getValue());
  }

  get() {
    return MenuService.menuDisplay.asObservable();
  }
}
