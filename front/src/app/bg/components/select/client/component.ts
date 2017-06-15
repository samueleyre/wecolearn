import { Component, Input, Output, EventEmitter,OnChanges, OnInit, Injectable, Inject } from '@angular/core';
import { Http } 				from '@angular/http';
import 'rxjs/add/operator/map';

import { GPPDService } 			from './../../../service/gppd';
import { IEntity }				from './../../../entity/interface';
import { PaginationService } 	from './../../../../applicativeService/pagination/service';

@Component({
	selector: 'select-client',
	template : `<select [(ngModel)]="_idClient" (ngModelChange)="onChange($event)" class="form-control">
  					<option *ngFor="let client of _clients" value="{{ client.id }}">{{ client.name }}</option>
  				</select>`,
  	
})
@Injectable()
export class SelectClientComponent implements OnInit {

	_idClient:any;
	_clients: any = [];

	constructor( protected http: Http ) {
		this._idClient = null;
	}

	ngOnInit(): void {
		PaginationService.disable();
		this.http.get('/api/clients')
		.map( response   => {
			return response.json();
		}).subscribe( clients => {
			this._clients = clients;
			if( typeof clients === 'object' && clients !== null && typeof clients[0] !== 'undefined') {
				this.onChange( clients[0].id ); 
			}
		});
	}

	onChange( newValue:string ) {
		this._idClient  = parseInt(newValue);
		this.idClientChange.emit( this._idClient );
	}

	@Output() idClientChange = new EventEmitter();
	
	@Input()
	set idClient( idClient:number ) {
		this._idClient =  idClient;
	}
}