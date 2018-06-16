import {
    Component,
    OnInit,
    Injectable
}                             from '@angular/core';


import { Router, ActivatedRoute, Params} from '@angular/router';

import { NgForm }             from '@angular/forms';

import { IEntity }                from './../../../../entity/interface';
import { Client }                from './../../../../entities/client/entity';
import { Thread }                from './../../../../entities/thread/entity';
import { Image }                from './../../../../entities/image/entity';

import { GPPDService }            from './../../../../service/gppd';
import { GPPDComponent }          from './../../../../component/gppd';

import { MessageService }         from './../../../../../applicativeService/message/service';
import {FilterService}            from "../../../../../applicativeService/filter/service";
import {log} from "util";
import {ThreadsService}           from "../../../../service/threads.service";
import {SearchService}            from "../../../../service/search";
import {Logged} from "../../../../../applicativeService/authguard/logged";
import {LoggedService} from "../../../../service/logged";
import {image} from "../../../../../applicativeService/constants/image";
import {LoggerService} from "../../../../../applicativeService/logger/service";


@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class SearchComponent extends GPPDComponent implements OnInit {


    private avatarSrcBase : string;
    public cards: any[] = null;
    public max: number = 4;
    public screen: boolean =  false;
    private logged = false;
    private openChat: string;

    constructor( protected service: GPPDService,
                 private activatedRoute: ActivatedRoute,
                 public threadsService: ThreadsService,
                 private router: Router,
                 private searchService: SearchService,
                 private LoggedService: LoggedService,
                 private loggerService: LoggerService
    ) {
        super(service);
    }

    ngOnInit() {
      this.avatarSrcBase =  GPPDComponent.updateUrl('/img/');
      this.load();
      this.screen =  GPPDComponent.getScreenSize();
    }


    load() : void {


      let logged = this.LoggedService.get();

      if (logged) {
        this.logged = true;
        this.searchService.search().subscribe();
        this.openChat = "Discuter";
      } else {
        this.openChat = "Connectez-vous pour discuter !";
        // todo: if tag and lat/long are in url, get them
      }

      this.searchService.getCurrentFoundClients().subscribe( ( clients:any[] ) => {
        this.cards = clients;
      })

    }

    getEntity() {
        return new Client();
    }

    openThread(card : Client) {

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

    onScroll() {
      //todo: only when arrives at bottom
      //todo: add loader when loading
      this.max += 1;
      if (this.max % 4 === 0) {
        this.searchService.search( 0, this.max ).subscribe();
      }

      //console.log('scrolled down');
    }

    onScrollUp(){
      //console.log('scrolled up');
    }


}
