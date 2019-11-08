import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class FooterMobileService {
  searchFocusState: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
