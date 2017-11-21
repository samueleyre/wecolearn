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
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class SearchComponent extends GPPDComponent implements OnInit {




    constructor( protected service: GPPDService) {
        super(service);
    }

    ngOnInit() {
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