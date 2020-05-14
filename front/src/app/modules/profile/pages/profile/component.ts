import {
    Component,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

import { User } from '~/core/entities/user/entity';
import { NAV } from '~/config/navigation/nav';

import { ProfileService } from '../../../../core/services/user/profile';

@Component({
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  public user$: Observable<User>;
  private readonly onDestroy = new Subject<void>();

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute,
              private router: Router,
              private deviceService: DeviceDetectorService,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.user$ = this.profileService.get({}, params.get('profileUrl'));
      this.user$.pipe(
        takeUntil(this.onDestroy),
      ).subscribe(
        () => {},
        (err) => {
          this.router.navigate([NAV.notFound]);
        },
      );
    });
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
