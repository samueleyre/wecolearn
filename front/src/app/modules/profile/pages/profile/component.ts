import {
    Component,
    OnInit,
    Injectable, OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

import { User } from '~/core/entities/user/entity';

import { ProfileService } from '../../services/profile';


@Component({
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})export class ProfilePageComponent implements OnInit, OnDestroy {
  public user$: Observable<User>;
  private readonly onDestroy = new Subject<void>();

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute,
              private deviceService: DeviceDetectorService,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.user$ = this.profileService.get({}, params.get('profileUrl'));
      this.user$.pipe(takeUntil(this.onDestroy)).subscribe();
    });
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
