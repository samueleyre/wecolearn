import {
    Component,
    OnInit,
    Injectable,
    Input
}                             from '@angular/core';


import { Router, ActivatedRoute, Params} from '@angular/router';


import  { User} from '../../../../entities/user/entity';
import { Image }                 from './../../../../entities/image/entity';

import { GPPDService }            from './../../../../service/gppd';
import { GPPDComponent }          from './../../../../component/gppd';

import {SearchService}            from "../../../../service/search";
import {LoggedService} from "../../../../service/logged";
import {LoggerService} from "../../../../../applicativeService/logger/service";
import {ClientService} from "../../../../service/client";
import {image} from "../../../../../applicativeService/constants/image";
import {Thread} from "../../../../entities/thread/entity";
import {Observable} from "rxjs";
import {ThreadsService} from "../../../../service/threads.service";
import {DomainService} from "../../../../service/domain";
import {ObjectIteratorTypeGuard} from "lodash";


@Component({
    selector: "card",
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class CardComponent implements OnInit {


  @Input() card: User;


  private avatarSrcBase : string;
  public max: number = 4;
  public screen: boolean =  false;
  private currentClient: User;
  private cardSlackId: Object = {};
  private showSlack : Object = {};
  private baseImageName : string = image.default_200px;
  private logged = false;
  private openChat: string;
  private subDomain : string = null;
  private slackSubDomain : string = null;
  private rocketChatDomain: string = null;
  private types = ["slack", "rocketchat"]; // from database !



  constructor( protected service: GPPDService,
                 private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private searchService: SearchService,
                 private LoggedService: LoggedService,
                 private loggerService: LoggerService,
                 private clientService: ClientService,
                 public threadsService: ThreadsService,
                 private domainService: DomainService,


  ) {

    for( let i= 0; i< this.types.length; i++ ) {
        this.showSlack[this.types[i]] = false;
        this.cardSlackId[this.types[i]] = false;
    }
  }

  ngOnInit() {

    // todo: if tag and lat/long are in url, get them



    let logged = this.LoggedService.get();
    this.subDomain = this.domainService.getSubDomain();
    this.slackSubDomain = this.domainService.getSlackSubDomain();

    this.rocketChatDomain = this.domainService.getRocketChatDomain();



    if (logged) {
      this.logged = true;
      this.openChat = "Discuter";
    } else {
      this.openChat = "Connecte-toi pour discuter !";
    }

    this.avatarSrcBase =  GPPDComponent.updateUrl('/img/');

    this.screen =  GPPDComponent.getScreenSize();
    this.clientService.get().subscribe((client:User)=> {


      this.currentClient = client;
      for( let i= 0; i< this.types.length; i++ ) {

        let currentClientSlackAccount = this.currentClient.slack_accounts.find((slack_account:any)=> (slack_account.slack_team.type === this.types[i]));
        let cardSlackAccount = this.card.slack_accounts.find((slack_account:any)=> (slack_account.slack_team.type === this.types[i]));

        if (undefined !== cardSlackAccount && undefined !==  currentClientSlackAccount) {
          this.cardSlackId[this.types[i]] = cardSlackAccount.account_id;
          this.showSlack[this.types[i]] = ( cardSlackAccount.slack_team.id === currentClientSlackAccount.slack_team.id );
        }

      }

    });



  }

  openThread(card : User) {

    this.loggerService.log("openThread", this.logged)

    if (this.logged) {

      if (false) { // todo: see if thread exists

      } else {
        if (!card.image) {
          card.image = new Image(null, image.default_200px);
        }
        let thread = new Thread( card.id, card.first_name, card.image.filename)
        this.threadsService.setCurrentThread(thread);
      }

    } else {

      this.router.navigate(['/login']);

    }

  }






}
