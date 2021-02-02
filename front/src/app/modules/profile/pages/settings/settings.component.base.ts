import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '~/core/entities/user/entity';
import { ProfileService } from '~/core/services/user/profile.service';
import { DestroyObservable } from '~/core/components/destroy-observable';

@Component({
  template: '',
})export class SettingsComponentBase extends DestroyObservable implements OnInit {
  user$: Observable<User>;

  constructor(
    private profileService: ProfileService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.user$ = this.profileService.get();
  }
}
