import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { APP_BASE_HREF, Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute, Router } from '@angular/router';

import { DomainService } from '~/core/services/domain/domain';
import { ProfileService } from '~/core/services/user/profile.service';
import { ToastService } from '~/core/services/toast.service';
import { ProfileSettingsComponentBase } from '~/modules/profile/components/profileSettings/profile-settings.component.base';
import { Tag } from '~/core/entities/tag/entity';
import { tagTypeEN, TagTypeEnum } from '~/core/enums/tag/tag-type.enum';

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
    private _toastService: ToastService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
  ) {
    super(_r, _domainService, _fb, _deviceService, _profileService, _toastService);
    _route.queryParams.subscribe((params) => {
      if ('tag_id' in params && 'tag_type' in params && 'tag_name' in params) {
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
      }
    });
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
    this.joinTags();
    if (!this.tags.find(t => t.id === tag.id)) {
      this.tags.push(tag);
      this.submit();
    }
  }

  // getTagControlByType(tagType: TagTypeEnum): FormControl {
  //   const tagTypeCasted = Number(tagType);
  //   if (tagTypeCasted === TagTypeEnum.LEARN) {
  //     return <FormControl>this.userForm.get('learn_tags');
  //   }
  //   if (tagTypeCasted === TagTypeEnum.KNOW) {
  //     return <FormControl>this.userForm.get('learn_tags');
  //   }
  //   if (tagTypeCasted === TagTypeEnum.TEACH) {
  //     return <FormControl>this.userForm.get('teach_tags');
  //   }
  //   console.error('tag type is not defined');
  // }
}
