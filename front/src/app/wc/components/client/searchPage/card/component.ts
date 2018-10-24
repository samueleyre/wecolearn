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
  private cardSlackId: string;
  private showSlack: boolean = false;
  private baseImageName : string = image.default_200px;
  private logged = false;
  private openChat: string;


  constructor( protected service: GPPDService,
                 private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private searchService: SearchService,
                 private LoggedService: LoggedService,
                 private loggerService: LoggerService,
                 private clientService: ClientService,
                 public threadsService: ThreadsService,

  ) {}

  ngOnInit() {

    let logged = this.LoggedService.get();

    if (logged) {
      this.logged = true;
      this.openChat = "Discuter";
    } else {
      this.openChat = "Connecte-toi pour discuter !";
      // todo: if tag and lat/long are in url, get them
    }


    this.avatarSrcBase =  GPPDComponent.updateUrl('/img/');
    this.screen =  GPPDComponent.getScreenSize();

    this.clientService.get().subscribe((client:User)=> {
      this.currentClient = client;
      let currentClientSlackAccount = this.currentClient.slack_accounts.find((slack_account:any)=> (slack_account.slack_team.type === "slack"));
      let cardSlackAccount = this.card.slack_accounts.find((slack_account:any)=> (slack_account.slack_team.type === "slack"));

      if (undefined !== cardSlackAccount && undefined !==  currentClientSlackAccount) {
        this.cardSlackId = cardSlackAccount.account_id;
        this.showSlack = ( cardSlackAccount.slack_team.id === currentClientSlackAccount.slack_team.id );
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
