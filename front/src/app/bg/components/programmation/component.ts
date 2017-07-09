import { 
        Component, 
        OnInit,
        Injectable,
        Inject 
   }                                  from '@angular/core';
import { Http }                       from '@angular/http';
import { NgForm }                     from '@angular/forms';

import { Programmation }                        from './entity';

import { GPPDService }                 from './../../service/gppd';
import { GPPDComponent }               from './../../component/gppd';

import { PopinConfirmService }         from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html',
})

@Injectable()
export class ProgrammationComponent extends GPPDComponent implements OnInit {
    
    public used: number|null = null;

    constructor( protected service : GPPDService , protected confirm: PopinConfirmService ) {
        super( service, confirm );
    } 
    
    ngOnInit() {
        this.load();
        
    }

    getApi() {
        return '/api/programmations';
    }

    getEntity() {
        return new Programmation();
    }
}