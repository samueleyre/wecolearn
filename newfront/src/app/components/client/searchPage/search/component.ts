import {
    Component,
    OnInit,
    Injectable
}                             from '@angular/core';


import { Router, ActivatedRoute, Params} from '@angular/router';


import {User} from '../../../../entities/user/entity';

import { GPPDService }            from '../../../../service/gppd';
import { GPPDComponent }          from '../../../component/gppd';

import {ThreadsService}           from "../../../../service/threads.service";
import {SearchService}            from "../../../../service/search";
import {LoggedService} from "../../../../service/logged";
import {LoggerService} from "../../../../applicativeService/logger/service";
import {Observable} from "rxjs";
import {ClientService} from "../../../../service/client";


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
    private loading: Observable<boolean>;
    private currentlySearching: boolean = false;


  constructor( protected service: GPPDService,
                 private activatedRoute: ActivatedRoute,
                 public threadsService: ThreadsService,
                 private router: Router,
                 private searchService: SearchService,
                 private LoggedService: LoggedService,
                 private loggerService: LoggerService,
                 private clientService: ClientService
    ) {
        super(service);
    }

    ngOnInit() {
      this.avatarSrcBase =  GPPDComponent.updateUrl('/img/');
      this.load();
      this.screen =  GPPDComponent.getScreenSize();
    }


    load() : void {


      this.searchService.getCurrentFoundClients().subscribe( ( clients:any[] ) => {
        this.cards = clients;
      });

      this.loading = this.searchService.getLoading('tag');

      this.loading.subscribe((loading)=> {
          this.currentlySearching = loading;
        }
      )

    }

    getEntity() {
        return new User();
    }



    onScroll() {
      //todo: only when arrives at bottom
      this.max += 4;
      if (this.max % 4 === 0 && false === this.currentlySearching && "/search" === this.router.url ) {
        this.searchService.search( 0, this.max ).subscribe(() =>{

        });
      }

    }

    onScrollUp(){
    }


}
