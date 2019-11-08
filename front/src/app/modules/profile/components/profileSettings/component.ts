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

import { User } from '~/core/entities/user/entity';
import { Tag } from '~/core/entities/tag/entity';
import { Image } from '~/core/entities/image/entity';
import { ClientService } from '~/core/services/client';
import { TagService } from '~/core/services/tag';
import { DomainService } from '~/core/services/domain';
import { AuthenticationService } from '~/core/services/auth/auth';
import { SlackTeam } from '~/core/entities/slackTeam/entity';
import { SlackAccount } from '~/core/entities/slackAccount/entity';
import { UrlService } from '~/core/services/url';
import { environment } from '~/../environments/environment';


@Component({
  selector: 'profile-settings',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class ProfileSettingsComponent implements OnInit {
  @Input()
  set _user(user) {
    this.user = user;
  }

  public zoom = 4;
  public user: User;

  public tags = [];


  private webPath: string;
  uploadError: object = {};
  private tagTypes = ['learn_tags', 'know_tags', 'teach_tags'];
  loading = false;


  private error = {
    slack: '',
  };
  private redirectURI: string;
  hasSlack: boolean;
  hasRocketChat: boolean;
  hasSlackAccount = false;
  rocketChatId: string;

  constructor(
        protected clientService: ClientService,
        protected tagService: TagService,
        private activatedRoute: ActivatedRoute,
        protected http: HttpClient,
        @Inject(APP_BASE_HREF) r: string,
        private domainService: DomainService,
        private authenticationService: AuthenticationService,
        private fb: FormBuilder,
  ) {
    this.tagService = tagService;
    this.clientService = clientService;
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
  });


  ngOnInit() {
    this.webPath = UrlService.updateUrl('/');
    this.load();
  }

  load(): void {
    let subDomain = this.domainService.getSubDomain();
    this.hasSlack = this.domainService.hasSlack();
    this.hasRocketChat = this.domainService.hasRocketChat();

    // TODO : set as enum
    if (subDomain === 'wecolearn') {
      subDomain = '';
    } else {
      subDomain += '.';
    }


    this.redirectURI = (environment.production) ?
      encodeURIComponent(`https://${subDomain}wecolearn.com/profilsettings`) : encodeURIComponent('http://0.0.0.0:8080/profilsettings');

    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   if (params && params['code']) {
    //     this.slackConnect(params['code'], this.redirectURI);
    //   }
    // });
    if (this.user) {
      this.setClient(this.user);
    }
  }

  setClient(user: User) {
    this.userForm.patchValue(user);
    this.setTags(user);

    // if (!this.client['latitude']) {
    //   this.setDefaultLatLong();
    // }

    // this.hasSlackAccount = (null !== this.clientService.getSlackAccount(client, 'slack'));
    // this.rocketChatId = this.clientService.getSlackAccount(client, 'rocketchat');
  }

  setTags(user: User) {
    this.userForm.controls.learn_tags.setValue(user.tags.filter((tag: Tag) => tag.type === 0));
    this.userForm.controls.know_tags.setValue(user.tags.filter((tag: Tag) => tag.type === 1));
    this.userForm.controls.teach_tags.setValue(user.tags.filter((tag: Tag) => tag.type === 2));
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
    this.clientService.patch({ tags: this.tags, ...this.userForm.value }).subscribe(
            (client: User) => {
              //
            },
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
