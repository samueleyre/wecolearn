import { 
        Component, 
        OnInit,
        Injectable,
        Inject 
   }                                  from '@angular/core';
import { Http }                       from '@angular/http';
import { NgForm }                     from '@angular/forms';

import { Recherche }                        from './entity';

import { GPPDService }                 from './../../service/gppd';
import { GPPDComponent }               from './../../component/gppd';


import { PopinConfirmService }         from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html',
})

@Injectable()
export class RechercheComponent extends GPPDComponent implements OnInit {
    
    constructor( protected service : GPPDService , protected confirm: PopinConfirmService ) {
        super(service, confirm );
    } 
    
    ngOnInit() {
        this.load();
        
    }

    getMessage() {
        return 'Vous allez effacer cette recherche, êtes vous sûr ?';
    }

    getApi() {
        return '/api/recherches';
    }

    getEntity() {
        return new Recherche();
    }

    
}