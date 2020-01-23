import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

import { User } from '~/core/entities/user/entity';
import { ProfileService } from '~/modules/profile/services/profile';


@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})export class ProfileSettingsPageComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  private readonly onDestroy = new Subject<void>();


  constructor(private _profileService: ProfileService, private deviceService: DeviceDetectorService) {

  }

  ngOnInit(): void {
    this.user$ = this._profileService.get();
    this.user$.pipe(takeUntil(this.onDestroy)).subscribe();
  }


  get isMobile() {
    return this.deviceService.isMobile();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
