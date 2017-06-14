import { Component, Input, Output, EventEmitter,OnChanges, OnInit, Injectable, Inject } from '@angular/core';

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

	_idClient:number|null;
	_clients: IEntity[] = [];

	constructor( @Inject(GPPDService) protected service: GPPDService ) {
		this._idClient = null;
		this.service.setApi('/api/clients');
	}

	ngOnInit(): void {
		PaginationService.disable();
		this.service.get().subscribe( ( entities:IEntity[])  => {
			this._clients = entities;
			if( typeof entities === 'object' && entities !== null ) {
				this._idClient = entities[0].id;
			}
		});
	}

	onChange( newValue:string ) {
		this._idClient  = parseInt(newValue);
		this.idClientChange.emit(this._idClient);
	}

	@Output() idClientChange = new EventEmitter();
	
	@Input()
	set idClient( idClient:number ) {
		this._idClient = idClient;
	}

}