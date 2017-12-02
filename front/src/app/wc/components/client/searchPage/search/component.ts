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
import {ThreadsService} from "../../../../service/threads.service";
import {SearchService} from "../../../../service/search";


@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class SearchComponent extends GPPDComponent implements OnInit {


    private avatarSrcBase : string;
    private cards: any = null;
    private max: number = 10;

    constructor( protected service: GPPDService, private activatedRoute: ActivatedRoute, public threadsService: ThreadsService, private searchService: SearchService) {
        super(service);
    }

    ngOnInit() {
      this.avatarSrcBase =  GPPDComponent.updateUrl('/img/');
      this.load();
    }

    load() : void {
      this.searchService.autoLoad().subscribe( ( clients: IEntity[] ) => {
        this.entities = clients;
        this.cards = clients;
        //console.log("cards", this.cards);
      });
    }

    getEntity() {
        return new Client();
    }

    openThread(card : Client) {

      if (false) { //thread exists

      } else {
          let thread = new Thread( card.id, card.first_name, card.image.filename)
          this.threadsService.setCurrentThread(thread);

      }
    }

    onScroll() {
      this.max += 2;
      this.searchService.search( 0, this.max ).subscribe( ( clients: IEntity[] ) => {
        this.entities = clients;
        this.cards = clients;
      });
      console.log('scrolled down');
    }

    onScrollUp(){
      console.log('scrolled up');
    }


}
