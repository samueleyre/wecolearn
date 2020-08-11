import {
    Component,
    OnInit,
    Injectable,
    Input,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '~/core/entities/user/entity';
import { DomainService } from '~/core/services/domain/domain';
import { chat } from '~/config/chat';
import { Tag } from '~/core/entities/tag/entity';
import { ProfileService } from '~/core/services/user/profile.service';
import { SearchService } from '~/core/services/search/search';


@Component({
  selector: 'app-card',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})export class CardComponent implements OnInit {
  @Input() card: User;
  @Input() searchTag: Tag;

  public tags: Tag[] = [];

  private currentUser: User;
  private cardSlackId: Object = {};
  public showSlack: Object = {};
  private subDomain: string = null;
  private slackSubDomain: string = null;
  private rocketChatDomain: string = null;
  private types = chat.types;


  constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private searchService: SearchService,
        private _profileService: ProfileService,
        private domainService: DomainService,
    ) {
      for (let i = 0; i < this.types.length; i++) { // tslint:disable-line
        this.showSlack[this.types[i]] = false;
        this.cardSlackId[this.types[i]] = false;
      }
  }

  ngOnInit() {
    this.currentUser = this._profileService.profile;

    this.subDomain = this.domainService.getSubDomain();
    this.slackSubDomain = this.domainService.getSlackSubDomain();
    this.rocketChatDomain = this.domainService.getRocketChatDomain();
    this.tags = [
      ...this.card.tags.filter(tag => !this.isSearchTag(tag)),
    ];

    const foundTag = this.card.tags.find(tag => this.isSearchTag(tag));

    if (foundTag) {
      this.tags.unshift(foundTag);
    }

    // todo: repare slack
    // for (let i = 0; i < this.types.length; i++) { // tslint:disable-line
    //   const currentClientSlackAccount = this.currentClient.slack_accounts
    //     .find((slackAccount: any) => (slackAccount.slack_team.type === this.types[i]));
    //   const cardSlackAccount = this.card.slack_accounts.find((slackAccount: any) => (slackAccount.slack_team.type === this.types[i]));
    //   if (undefined !== cardSlackAccount && undefined !== currentClientSlackAccount) {
    //     this.cardSlackId[this.types[i]] = cardSlackAccount.account_id;
    //     this.showSlack[this.types[i]] = (cardSlackAccount.slack_team.id === currentClientSlackAccount.slack_team.id)
    //       && (
    //         (this.subDomain === 'lesbricodeurs' && this.types[i] === 'slack')
    //         || (this.subDomain === 'lamyne' && this.types[i] === 'rocketchat')
    //       );
    //   }
    // }
  }

  isSearchTag(tag: Tag) {
    return this.searchTag && this.searchTag.id && this.searchTag.id === tag.id;
  }

  searchByTag(tag) {
    this.searchService.setSearchInput(tag);
    this.searchService.search({ tag }).subscribe();
  }

  tagDisplayTitle(tag: Tag): string {
    return `${tag.name}${tag.tag_domain ? ` | ${tag.tag_domain.name}` : ''}`.trim();
  }

  tagDisplayName(tag: Tag): string {
    return `${tag.name} ${tag.tag_domain ? tag.tag_domain.emoji : ''}`.trim();
  }
}
