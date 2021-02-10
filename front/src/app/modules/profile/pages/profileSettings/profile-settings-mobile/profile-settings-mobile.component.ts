import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { APP_BASE_HREF, Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute, Router } from '@angular/router';
import {distinctUntilChanged, filter, take, takeUntil, tap} from 'rxjs/operators';
import { merge } from 'rxjs';

import { DomainService } from '~/core/services/domain/domain';
import { ProfileService } from '~/core/services/user/profile.service';
import { ToastService } from '~/core/services/toast.service';
import { Tag } from '~/core/entities/tag/entity';
import { tagTypeEN, TagTypeEnum, tagTypes } from '~/core/enums/tag/tag-type.enum';
import { ProfileSettingsComponentBase } from '~/modules/profile/pages/profileSettings/profile-settings.component.base';

@Component({
  selector: 'app-profile-settings-mobile',
  templateUrl: './profile-settings-mobile.component.html',
  styleUrls: ['./profile-settings-mobile.component.scss'],
})
export class ProfileSettingsMobileComponent extends ProfileSettingsComponentBase implements OnInit, AfterViewInit {
  fragment = '';

  constructor(
    @Inject(APP_BASE_HREF) _r: string,
    private _domainService: DomainService,
    private _fb: FormBuilder,
    private _deviceService: DeviceDetectorService,
    private _profileService: ProfileService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
  ) {
    super(_r, _domainService, _fb, _deviceService, _profileService);

    const routeWithParams$ = _route.queryParams.pipe(
      take(1),
      filter(params => !('tag_id' in params && 'tag_type' in params && 'tag_name' in params)),
      tap((params) => {
        // get newest values from api
        this._profileService.get().subscribe();
      }),
    );

    const routeWithoutParams$ = _route.queryParams.pipe(
      filter(params => 'tag_id' in params && 'tag_type' in params && 'tag_name' in params),
      take(1),
      tap((params) => {
        // remove query params
        this._router.navigate(
          [],
          {
            relativeTo: _route,
          }).then(() => {
            this.addTag(
              new Tag({
                id: Number(params.tag_id),
                type: Number(params.tag_type),
                name: params.tag_name,
              }),
            );
          });
      }),
    );

    merge(
      routeWithParams$,
      routeWithoutParams$,
    ).pipe(
      takeUntil(this.destroy$),
    ).subscribe();
  }

  ngOnInit() {
    super.subscribeToUpdates();
    super.autoSaveChanges();
  }

  ngAfterViewInit() {
    this.scrollToAnchor(window.location.hash);
  }

  public scrollToAnchor(elementId?: string): void {
    if (elementId) {
      window.location.hash = '';
      window.location.hash = elementId;
    }
  }

  public tagTypeEn(type: TagTypeEnum): string {
    return tagTypeEN[type];
  }

  public addTag(tag: Tag): void {
    const tagCtrl = this.userForm.get(this.tagTypeEn(tag.type) + '_tags');
    const tags = tagCtrl.value;
    if (!tags.find(t => t.id === tag.id)) {
      tags.push(tag);
      tagCtrl.setValue(tags);
    }
  }
}
