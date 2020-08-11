import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { takeUntil } from 'rxjs/operators';

import { User } from '~/core/entities/user/entity';
import { ProfileService } from '~/core/services/user/profile.service';

@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})export class SettingsPageComponent implements OnInit {
  user$: Observable<User>;
  private readonly onDestroy = new Subject<void>();

  constructor(private _profileService: ProfileService, private _deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.user$ = this._profileService.get();
    this.user$.pipe(takeUntil(this.onDestroy)).subscribe();
  }

  get isMobile() {
    return this._deviceService.isMobile();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
