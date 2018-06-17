import {
    Component,
    OnInit,
    Injectable
}                             from '@angular/core';

import {Observable} from 'rxjs/Observable';


import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';

import { NgForm }             from '@angular/forms';

import { IEntity }                from './../../../entity/interface';
import { Tag }                from './../../../entities/tag/entity';

import { GPPDService }            from './../../../service/gppd';
import { GPPDComponent }          from './../../../component/gppd';

import { MessageService }         from './../../../../applicativeService/message/service';
import { SearchService }         from './../../../service/search';
import {FilterService}            from "../../../../applicativeService/filter/service";
import {log} from "util";
import {SafeHtml} from "@angular/platform-browser";
import {TagService} from "../../../service/tag";


@Component({
    selector : 'searchBar',
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class SearchBarComponent extends GPPDComponent implements OnInit {


    private searchInput : string;
  private loading: Observable<boolean>;
  private currentlySearching: boolean = false;


  constructor( protected service: GPPDService,
                 protected tagService : TagService,
                 private searchService: SearchService,
                 private router: Router
) {
        super(service);
        this.tagService = tagService;
    }


    ngOnInit() {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (this.router.url === "/search") {
            this.search();
          }
        }
      });

      this.loading = this.searchService.getLoading();
      this.loading.subscribe((loading)=> {
            this.currentlySearching = loading;
          }
      )
    }


    getApi() {
        return '/api/tag';
    }

    getEntity() {
        return new Tag();
    }

    search(text:string = null) {

      if (this.currentlySearching) {
        return;
      }

      if (!text) {
        text = this.searchInput;
      }

      this.searchService.addSearchParameter("tag", text);

      this.searchService.search().subscribe(
        () =>{
          FilterService.clear();
          this.router.navigate(['/search']);
        }
      );
    }

    observableSource(text: string) {
        return this.tagService.findTags(text);
    }


}