import {
    Component,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, of} from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { User } from '~/core/entities/user/entity';
import { NAV } from '~/config/navigation/nav';
import { UserService } from '~/core/services/user/user.service';
import { DestroyObservable } from '~/core/components/destroy-observable';


@Component({
  template: '',
})
export class ProfileComponentBase extends DestroyObservable implements OnInit, OnDestroy {
  public user$: Observable<User>;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.user$ = this.userService.get({}, params.get('profileUrl')).pipe(
        catchError((err) => {
          this.router.navigate([NAV.notFound]);
          return of(null);
        }),
      );
    });
  }
}
