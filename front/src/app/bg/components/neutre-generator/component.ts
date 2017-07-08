import { 
        Component, 
        OnInit,
        Injectable 
   }                              from '@angular/core';
import { Http }                   from '@angular/http';
import { NgForm }                 from '@angular/forms';

import { Neutre }                 from './../neutre/entity';

import { GPPDService }            from './../../service/gppd';
import { GPPDComponent }          from './../../component/gppd';


import { PopinConfirmService }    from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class NeutreGeneratorComponent  {
    
    public sentences:string = '';
    public neutres: Neutre[];
    
    constructor( private confirm: PopinConfirmService, private http: Http ) {
        
    } 
    
    
    explode() {
        this.http.post('/api/neutres/generator', { sentences : this.sentences }).map( ( response : any ) => {
            return response.json();
        }).subscribe( ( neutres:Neutre[]) => {
            this.neutres  = neutres;
        });
    }

    post( neutre : Neutre , index : number ) {
        
        let entity = new Neutre();
        entity.set( neutre );

        console.log( entity);

        this.http.post('/api/neutres', entity).map(( response : any ) => {
            return response.json();            
        })
        .subscribe( ( neutre : Neutre ) => {
            this.neutres.splice( index, 1 );
            
        });
    }

    delete( index : number ) {
        this
        .confirm
        .setMessage('Êtes vous sur de vouloir supprimer cette Phrase')
        .subscribe( (confirm : boolean) => {
            if( confirm ) {
                  this.neutres.splice( index, 1 );
            }
        });
    }
}