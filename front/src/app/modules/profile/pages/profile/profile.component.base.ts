import {
    Component,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
      this.user$ = this.userService.get({}, params.get('profileUrl'));
      this.user$.pipe(
        takeUntil(this.destroy$),
      ).subscribe(
        () => {},
        (err) => {
          this.router.navigate([NAV.notFound]);
        },
      );
    });
  }
}
