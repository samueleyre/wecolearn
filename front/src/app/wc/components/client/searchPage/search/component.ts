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

import { ChatExampleData } from './../../chat/data/chat-example-data';

import { ClientService } from './../../../../service/client';
import { ThreadsService } from './../../../../service/threads.service';
import { MessagesService } from './../../../../service/messages';



@Component({
    templateUrl: 'template.html',
    styleUrls : ['style.scss']
})

@Injectable()
export class SearchComponent extends GPPDComponent implements OnInit {


    private cards: any = null;

    constructor( protected service: GPPDService, private activatedRoute: ActivatedRoute, public messagesService: MessagesService,
                 public threadsService: ThreadsService,
                 public ClientService: ClientService ) {
        super(service);
        ChatExampleData.init(messagesService, threadsService, ClientService);
    }

    ngOnInit() {

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