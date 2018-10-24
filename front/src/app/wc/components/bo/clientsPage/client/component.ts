import {
    Component,
    OnInit,
    Inject,
    Injectable, HostListener
} from '@angular/core';

import { LocalStorageService }       from 'angular-2-local-storage';

// import { NgForm }             from '@angular/forms';

// import {LocationStrategy, PathLocationStrategy} from '@angular/common';

import { Router } from '@angular/router';


import { User }                    from '../../../../entities/user/entity';

import { IEntity }                 from '../../../../../applicativeService/entity/interface';

import { GPPDService }             from './../../../../service/gppd';
import { GPPDComponent }             from './../../../../component/gppd';

// import { PopinConfirmService }    from './../../../../../applicativeService/popin/confirm/service';
// import { MessageService }          from './../../../../../applicativeService/message/service';



import { APP_BASE_HREF, Location } from '@angular/common';
// import {log} from "util";

@Component({
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
})

@Injectable()
export class ClientComponent extends GPPDComponent implements OnInit {

    base_url : string;
    private modify: object = {};
    private imagePath : string;
    private right = false;
    router: Router;

    constructor( protected service: GPPDService, @Inject(APP_BASE_HREF) r:string, router: Router, private localStorage: LocalStorageService) {
        super(service );
        this.base_url = r;
        this.router = router;
    }

    onComplete(id:string, response:any )
    {
        // console.log("uploaded", response)
        this.entities = response.response;
        this.modify[id] = false;
    }


    changePhoto(id : number) {
        // console.log(id)
        this.modify[id] = true;
        // console.log(this.modify);
    }

    ngOnInit() {
        this.imagePath = GPPDComponent.updateUrl('/img/');
        this.load();
    }

    getMessage() {
        return 'Etes vous sûr ?';
    }

    getApi() {
        return '/api/clients';
    }

    getEntity() {
        return new User();
    }






}