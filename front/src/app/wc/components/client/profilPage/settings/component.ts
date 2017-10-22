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
export class ProfilSettingsComponent extends GPPDComponent implements OnInit {



    constructor( protected service: GPPDService, private activatedRoute: ActivatedRoute ) {
        super(service);
    }

    ngOnInit() {

        this.load();
    }

    load() : void {
        this.service.setApi(this.getApi());
        this.service.get().subscribe( ( client: IEntity[] ) => {
            console.log("client", client);
            this.entity = this.setTags(client[0]);
            console.log("client", this.entity);
        });

    }

    setTags(client = this.entity) {
        client['learn_tags'] = [''];
        client['know_tags'] = [''];
        client['teach_tags'] = [''];
        if (client['tags'].length > 0) {
            for(let i=0; i< client['tags'].length ; i++) {
                console.log("types", client['tags'][i]['type'])
                switch (client['tags'][i]['type']) {
                    case "0":
                        client['learn_tags'][0] = client['tags'][i]['name'];
                        break;
                    case "1":
                        client['know_tags'][0] = client['tags'][i]['name'];
                        break;
                    case "2":
                        client['teach_tags'][0] = client['tags'][i]['name'];
                        break;
                }
            }
        }
        return client;
    }

    getApi() {
        return '/api/client';
    }

    getEntity() {
        let client = new Client();
        client.teach_tags = [''];
        client.learn_tags = [''];
        client.know_tags = [''];
        return client;
    }


}