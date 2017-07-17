import { Injectable }              from '@angular/core';
import { NgForm }                  from '@angular/forms';

import { GPPDService }             from './../service/gppd';

import { IEntity }                 from './../entity/interface';

import { PopinConfirmService }     from './../../applicativeService/popin/confirm/service';
import { MessageService }          from './../../applicativeService/message/service';    


export class GPPDComponent {
    
    entities: IEntity[] = [];
    entity: IEntity;
    edition:boolean = false;
    
    constructor( protected service: GPPDService, protected confirm: PopinConfirmService ) {
        this.entity = this.getEntity();
        this.service.setApi( this.getApi() );
    }

    getEntity(): any {
        
    }

    getApi(): string {
        return '/api';
    }

    getMessage(): string {
        return `vous allez effacer cette entité, êtes vous sûrs ?`;
    }
    
    ngOnInit() {
        this.load();
        
    }

    load() : void {
        this.service.setApi(this.getApi());
        this.service.get().subscribe( ( entities: IEntity[] ) => {
            this.entities  = entities;
        });
    }
 
    change( event: number ) : void {
        this.load();
    }

    submit(f:NgForm ) {
        
        if(this.edition) {
            this.service.patch( this.entity ).subscribe( 
                    ( entities: IEntity[] ) => { 
                        this.entities = entities;
                        MessageService.info('Un élément a été modifié');
                    }, 
                    error => { console.log(error) }
                );
            this.edition = false;

        } else {
           this.service.post( this.entity ).subscribe(
               ( entities: IEntity[] ) => {
                   this.entities = entities;
                   MessageService.info('Un élément a été ajouté');
               },
               error => { console.log(error) }
           ); 
        }
        f.resetForm();
        this.entity = this.getEntity();
    }

    edit( id : number ) {
        
        for( let i in this.entities ) {
            console.log('each id', this.entities[i].id );
            if( this.entities[i].id === id ) {
                this.entity = this.getEntity();
                this.entity.set( this.entities[i] );
                this.edition = true;
            }
        }
    }

    delete( id : number ) {

        this
        .confirm
        .setMessage( this.getMessage() )
        .subscribe( confirm => {
            if( true == confirm ) {
                this.service.delete( id ).subscribe(
                    ( entities: IEntity[] ) => { 
                        this.entity = this.getEntity();
                        this.entities = entities;
                        MessageService.info('Un élément a été supprimé');
                    },
                    error => {
                        console.log('ERRORS', error );
                    }
                )
            } else {
                console.log('CONFIRMATION', confirm );
            }
        });
    }
}