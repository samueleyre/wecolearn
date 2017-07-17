import { 
        Component, 
        OnInit,
        Injectable,
        Inject 
   }                                  from '@angular/core';
import { Http }                       from '@angular/http';
import { NgForm }                     from '@angular/forms';

import { Clef }                        from './entity';

import { GPPDService }                 from './../../service/gppd';
import { GPPDComponent }               from './../../component/gppd';


import { PopinConfirmService }         from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html',
})

@Injectable()
export class ClefComponent extends GPPDComponent implements OnInit {
    
    public idClient: number;
    
    constructor( protected service : GPPDService , protected confirm: PopinConfirmService ) {
        super(service, confirm );
    } 
    
    ngOnInit() {
        this.load();
       
        
    }

    getMessage() {
        return 'Vous allez effacer cette phrase clef, êtes vous sûr ?';
    }

    getApi() {
        return '/api/clefs';
    }

    getEntity() {
        return new Clef();
    }

    
}