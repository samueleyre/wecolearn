import { 
        Component, 
        OnInit,
        Injectable 
   }                                  from '@angular/core';
import { NgForm }                     from '@angular/forms';
import { Http }                       from '@angular/http';

import { Masse }                      from './model';
import { GPPDService }                from './../../service/gppd';
import { GPPDComponent }              from './../../component/gppd';
import { PopinConfirmService }        from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class MasseComponent  {
    
    public entity:Masse = new Masse();
    public loading:boolean = false;
    public keyForClient:number = 0;

    constructor( protected http: Http ) {}

    submit( f:NgForm ) {
        
        console.log( this.entity.serialize() );

        
        this.http.post('/api/masses', this.entity)
        .map(response => {
            return response.json();
        }).subscribe( response => {
            console.log( response );
        });
       
        
    }

}