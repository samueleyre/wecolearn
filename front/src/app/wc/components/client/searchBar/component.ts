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
import {FilterService}            from "../../../../applicativeService/filter/service";
import {log} from "util";


@Component({
    selector : 'searchBar',
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class SearchBarComponent extends GPPDComponent implements OnInit {


    private searchInput : string;
    private searchAutoComplete : Array<Tag>;

    constructor( protected service: GPPDService) {
        super(service);
    }

    ngOnInit() {
      this.searchAutoComplete = [new Tag(1, "test", 2), new Tag(2, "test2", 2)]
    }


    getApi() {
        return '/api/tag';
    }

    getEntity() {
        return new Tag();
    }

    onEnter() {

    }


}