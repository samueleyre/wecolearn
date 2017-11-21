import {
    Component,
    OnInit,
    Injectable
}                             from '@angular/core';


import {Router, ActivatedRoute, Params} from '@angular/router';

import { NgForm }             from '@angular/forms';

import { IEntity }                from './../../../../entity/interface';
import { Client }                from './../../../../entities/client/entity';

import { GPPDService }            from './../../../../service/gppd';
import { GPPDComponent }          from './../../../../component/gppd';

import { MessageService }         from './../../../../../applicativeService/message/service';
import {FilterService}            from "../../../../../applicativeService/filter/service";
import {log} from "util";


@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class SearchComponent extends GPPDComponent implements OnInit {


    private avatarSrcBase : string;
    private cards: any = null;

    constructor( protected service: GPPDService, private activatedRoute: ActivatedRoute ) {
        super(service);
    }

    ngOnInit() {
      this.avatarSrcBase =  GPPDComponent.updateUrl('/img/');
      this.load();
    }

    load() : void {
        this.service.setApi(this.getApi());
        this.service.get().subscribe( ( clients: IEntity[] ) => {
            this.entities = clients;
            this.cards = clients;
            console.log("cards", this.cards);
        });

    }

    getApi() {
        return '/api/client/matchs';
    }

    getEntity() {
        return new Client();
    }


}