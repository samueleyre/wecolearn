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

import { GPPDService }            from './../../../../service/gppd';
import { GPPDComponent }          from './../../../../component/gppd';

import { MessageService }         from './../../../../../applicativeService/message/service';
import {FilterService}            from "../../../../../applicativeService/filter/service";
import {log} from "util";
import {ThreadsService}           from "../../../../service/threads.service";
import {SearchService}            from "../../../../service/search";
import {Logged} from "../../../../../applicativeService/authguard/logged";


@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class SearchComponent extends GPPDComponent implements OnInit {


    private avatarSrcBase : string;
    private cards: any = null;
    public max: number = 4;
    public screen: boolean =  false;
    private logged = false;

    constructor( protected service: GPPDService,
                 private activatedRoute: ActivatedRoute,
                 public threadsService: ThreadsService,
                 private router: Router,
                 private searchService: SearchService) {
        super(service);
    }

    ngOnInit() {
      this.avatarSrcBase =  GPPDComponent.updateUrl('/img/');
      this.load();
      this.screen =  GPPDComponent.getScreenSize();
    }



    load() : void {

      Logged.get().subscribe( (logged:boolean) => {

        if (logged) {
          this.logged = true;
          this.searchService.autoLoad().subscribe();

        }


        // this.connected = logged;
      });

      this.searchService.currentFoundClients.subscribe( ( clients: IEntity[] ) => {
        this.entities = clients;
        this.cards = clients;
        console.log("cards", this.cards);
      })

    }

    getEntity() {
        return new Client();
    }

    openThread(card : Client) {

      if (this.logged) {
        if (false) { // todo: see if thread exists

        } else {
            let thread = new Thread( card.id, card.first_name, card.image.filename)
            this.threadsService.setCurrentThread(thread);

        }
      } else {
        this.router.navigate(['/login']);
      }

    }

    onScroll() {
      this.max += 2;
      this.searchService.search( 0, this.max ).subscribe();

      //console.log('scrolled down');
    }

    onScrollUp(){
      //console.log('scrolled up');
    }


}
