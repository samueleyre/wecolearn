import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

import { User } from '~/shared/entities/user/entity';
import { ClientService } from '~/shared/services/client';


@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class ProfileSettingsPageComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  private readonly onDestroy = new Subject<void>();


  constructor(private clientService: ClientService, private deviceService: DeviceDetectorService) {

  }

  ngOnInit(): void {
    this.user$ = this.clientService.get();
    this.user$.pipe(takeUntil(this.onDestroy)).subscribe();
  }


  get isMobile() {
    return this.deviceService.isMobile();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
