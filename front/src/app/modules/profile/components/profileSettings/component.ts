import {
  Component,
  OnInit,
  Injectable,
  Inject, ViewChild, Input,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APP_BASE_HREF, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { debounceTime, distinct, filter, takeUntil } from 'rxjs/operators';

import { User } from '~/core/entities/user/entity';
import { Tag } from '~/core/entities/tag/entity';
import { UserService } from '~/core/services/user/user.service';
import { TagService } from '~/core/services/tag/tag';
import { DomainService } from '~/core/services/domain/domain';
import { AuthenticationService } from '~/core/services/auth/auth';
import { environment } from '~/../environments/environment';
import { DestroyObservable } from '~/core/components/destroy-observable';
import { TagTypeEnum } from '~/core/enums/tag/tag-type.enum';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { ProfileService } from '~/core/services/user/profile.service';


@Component({
  selector: 'app-profile-settings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileSettingsComponent extends DestroyObservable implements OnInit {
  public tags = [];

  // loading = false;
  // private error = {
  //   slack: '',
  // };

  // private redirectURI: string;
  // hasSlack: boolean;
  // hasRocketChat: boolean;
  // hasSlackAccount = false;
  // rocketChatId: string;

  constructor(
        @Inject(APP_BASE_HREF) r: string,
        private domainService: DomainService,
        private fb: FormBuilder,
        private _deviceService: DeviceDetectorService,
        private _profileService: ProfileService,
  ) {
    super();
  }

  public userForm = this.fb.group({
    first_name: null,
    last_name: null,
    image: null,
    learn_tags: [],
    biographie: null,
    know_tags: [],
    teach_tags: [],
    intensity: null,
    slack_accounts: [],
    latitude: null,
    longitude: null,
    city: null,
  });


  ngOnInit() {
    this.load();

    this.userForm.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.submit();
      });

    // update data
    this._profileService.get().subscribe();
  }

  load(): void {
    // let subDomain = this.domainService.getSubDomain();
    // this.hasSlack = this.domainService.hasSlack();
    // this.hasRocketChat = this.domainService.hasRocketChat();

    // // TODO : set as enum
    // if (subDomain === 'wecolearn') {
    //   subDomain = '';
    // } else {
    //   subDomain += '.';
    // }

    // this.redirectURI = (environment.env === EnvEnum.PRODUCTION || environment.env === EnvEnum.STAGING) ?
    //   encodeURIComponent(`https://${subDomain}wecolearn.com/profilsettings`) : encodeURIComponent('http://0.0.0.0:8080/profilsettings');

    this._profileService.entity$
      .pipe(
        filter(val => !!val),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.setProfileFormData(user);
      });

    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   if (params && params['code']) {
    //     this.slackConnect(params['code'], this.redirectURI);
    //   }
    // });
  }

  get loaded() {
    return this._profileService.entity;
  }

  setProfileFormData(user: User) {
    this.userForm.patchValue(user, { emitEvent: false });
    this.setTags(user);

    // if (!this.client['latitude']) {
    //   this.setDefaultLatLong();
    // }

    // this.hasSlackAccount = (null !== this.clientService.getSlackAccount(client, 'slack'));
    // this.rocketChatId = this.clientService.getSlackAccount(client, 'rocketchat');
  }

  setTags(user: User) {
    this.userForm.controls.learn_tags.setValue(user.tags.filter((tag: Tag) => tag.type === 0), { emitEvent: false });
    this.userForm.controls.know_tags.setValue(user.tags.filter((tag: Tag) => tag.type === 1), { emitEvent: false });
    this.userForm.controls.teach_tags.setValue(user.tags.filter((tag: Tag) => tag.type === 2), { emitEvent: false });
  }

  // slackConnect(code: string, redirectUri: string) {
  //   this.loading = true;
  //   this.authenticationService.slackConnect(code, redirectUri).subscribe(
  //     (result) => {
  //       this.loading = false;
  //       if (result['error']) {
  //         this.error.slack = result['error'];
  //       } else {
  //         this.setClient(result);
  //       }
  //     },
  //     (error) => {
  //       this.error.slack = 'Une erreur est survenue';
  //       this.loading = false;
  //     },
  //       );
  // }

  submit() {
    this.joinTags();
    this._profileService.patch({ tags: this.tags, ...this.userForm.value }).subscribe(
      (user: User) => {},
      (error) => {
        console.log(error);
      },
    );
  }


  joinTags() {
    this.tags = [
      ...this.userForm.value.learn_tags,
      ...this.userForm.value.know_tags,
      ...this.userForm.value.teach_tags,
    ];
  }

  get learnType(): TagTypeEnum {
    return TagTypeEnum.LEARN;
  }

  get teachType(): TagTypeEnum {
    return TagTypeEnum.TEACH;
  }

  get knowType(): TagTypeEnum {
    return TagTypeEnum.KNOW;
  }


  // setDefaultLatLong() {
  //   this.client['latitude'] = 45.764043; // tslint:disable-line no-magic-numbers
  //   this.client['longitude'] = 4.835659; // tslint:disable-line no-magic-numbers
  //   this.zoom = 4;
  // }


  // private connectRocketChat() {
  //   const subDomain = this.domainService.getSubDomain();
  //
  //   let found = false;
  //   for (let i = 0; i < this.client.slack_accounts.length; i++) { // tslint:disable-line
  //           // for rocketchat we use subodmain as an id for a rocketchat team
  //     if (this.client.slack_accounts[i].slack_team.type === 'rocketchat' &&
  //       this.client.slack_accounts[i].slack_team.team_id === subDomain) {
  //       this.client.slack_accounts[i].account_id = this.rocketChatId;
  //       found = true;
  //     }
  //   }
  //   if (!found) {
  //     const newTeam = new SlackTeam(null, subDomain, subDomain, 'rocketchat');
  //     const newAccount = new SlackAccount(null, null, this.rocketChatId, newTeam);
  //     this.client.slack_accounts.push(newAccount);
  //   }
  //
  //
  //   this.submit();
  // }
}
