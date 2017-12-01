import {
    Component,
    OnInit,
    Injectable
}                             from '@angular/core';


import {Router, ActivatedRoute, Params} from '@angular/router';

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


@Component({
    selector : 'searchBar',
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class SearchBarComponent extends GPPDComponent implements OnInit {


    private searchInput : string;
    private searchAutoComplete : Array<String>;

    constructor( protected service: GPPDService, private searchService: SearchService) {
        super(service);
    }

    ngOnInit() {
      this.searchAutoComplete = ["php", "js"]
    }


    getApi() {
        return '/api/tag';
    }

    getEntity() {
        return new Tag();
    }

    search() {
        FilterService.addFilter("tag", this.searchInput);
        this.searchService.search().subscribe(
          () =>FilterService.clear()
        );
    }


}