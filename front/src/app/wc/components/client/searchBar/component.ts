import {
    Component,
    OnInit,
    Injectable
}                             from '@angular/core';

import {Observable} from 'rxjs';


import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';

import { NgForm }             from '@angular/forms';

import { IEntity }                from '../../../../applicativeService/entity/interface';
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
  private loaderPath: string;
  private searchBarStyle : object;
  private loadingTemplate: string;




  constructor( protected service: GPPDService,
                 protected tagService : TagService,
                 private searchService: SearchService,
                 private router: Router
) {
        super(service);
        this.tagService = tagService;
    }


    ngOnInit() {
      this.loaderPath = GPPDComponent.updateUrl('/home/')+"loader.gif";
      this.loadingTemplate = '<span class="input-loading" style="background-image: url('+this.loaderPath+');">Recherche en cours</span>';

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (this.router.url === "/search") {
            this.search();
          }
        }
      });

      this.loading = this.searchService.getLoading('tag');
      this.loading.subscribe((loading)=> {
        // console.log("changed currently searching", this.currentlySearching)
            this.currentlySearching = loading;
            if (!loading) {
              this.searchBarStyle = {
              };
            }
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

      this.searchBarStyle = {
        backgroundImage: "url("+this.loaderPath+")"
      };

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