import {
  Component,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '~/core/entities/user/entity';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { NAV } from '~/config/navigation/nav';


@Component({
  selector: 'profile',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class ProfileComponent extends DestroyObservable {
  constructor(private _router: Router) {
    super();
  }

  @Input() user: User;

  searchByTag(tag: string) {
    // todo: uncomment when implemented
    // this._router.navigate([NAV.search, tag]);
  }
}
