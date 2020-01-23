import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public static menuDisplay: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  static displayToggle() {
    MenuService.menuDisplay.next(!MenuService.menuDisplay.getValue());
  }

  get() {
    return MenuService.menuDisplay.asObservable();
  }
}
