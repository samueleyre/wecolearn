import { 
        Component, 
        OnInit,
        Injectable,
        Inject 
   }                                  from '@angular/core';
import { Http }                       from '@angular/http';
import { NgForm }                     from '@angular/forms';

import { Hebergeur }                        from './entity';

import { GPPDService }                 from './../../service/gppd';
import { GPPDComponent }               from './../../component/gppd';


import { PopinConfirmService }         from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html',
})

@Injectable()
export class HebergeurComponent extends GPPDComponent implements OnInit {
    
    constructor( protected service : GPPDService , protected confirm: PopinConfirmService ) {
        super(service, confirm );
    } 
    
    ngOnInit() {
        this.load();
        
    }

    getMessage() {
        return 'Vous allez effacer cette hébergeur, êtes vous sûr ?';
    }

    getApi() {
        return '/api/hebergeurs';
    }

    getEntity() {
        return new Hebergeur();
    }

    
}