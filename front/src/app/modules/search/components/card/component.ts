import {
    Component,
    OnInit,
    Injectable,
    Input,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '~/core/entities/user/entity';
import { ClientService } from '~/core/services/client';
import { DomainService } from '~/core/services/domain';
import { chat } from '~/config/chat';
import { AuthenticationService } from '~/core/services/auth/auth';

import { SearchService } from '../../services/search';
import { Threads } from '../../../chat/services/threads';


@Component({
  selector: 'app-card',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class CardComponent implements OnInit {
  @Input() card: User;

  private currentClient: User;
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
        private clientService: ClientService,
        private authService: AuthenticationService,
        public threadsService: Threads,
        private domainService: DomainService,
    ) {
      for (let i = 0; i < this.types.length; i++) { // tslint:disable-line
        this.showSlack[this.types[i]] = false;
        this.cardSlackId[this.types[i]] = false;
      }
  }

  ngOnInit() {
    this.currentClient = this.authService.user;

    this.subDomain = this.domainService.getSubDomain();
    this.slackSubDomain = this.domainService.getSlackSubDomain();
    this.rocketChatDomain = this.domainService.getRocketChatDomain();


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


  searchByTag(tag) {
    this.searchService.setSearchInput(tag);
    this.searchService.search({ tag }).subscribe();
  }
}
