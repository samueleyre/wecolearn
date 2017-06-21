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
	_withClef:boolean = false;

	constructor( protected http: Http ) {
		this._idClient = null;
	}

	ngOnInit(): void {
		this.load();
	}

	private load() {
		PaginationService.disable();
		let api = '/api/clients';
		if( this._withClef ) {
			api += '/avec-clefs';
		}
		this.http.get(api)
		.map( response   => {
			return response.json();
		}).subscribe( clients => {
			this.setClients( clients );
			if( typeof clients === 'object' && clients !== null && typeof this._clients[0] !== 'undefined') {
				this.onChange( this._clients[0].id ); 
			}
		});
	}

	onChange( newValue:string ) {	
		this._idClient  = parseInt(newValue);
		this.idClientChange.emit( this._idClient );
		let client = this.getCurrentClient();
		this.clientChange.emit(client);
		if( typeof client.keys !== 'undefined') {
			console.log('EMIT', client.keys);
			this.clefChange.emit(client.keys);
		}
	}

	private setClients( data: any ) {
		this._clients = [];
		data.forEach( ( element:any, index: any , array: any) => {
			let client:any;
			if( typeof element['0'] !== 'undefined') {
				client = element['0'];
				client['keys'] = element['1'];
			} else {
				client = element;
			}
			this._clients[index] = client;
		});
	}

	private getCurrentClient() {
		let _client:any;
		this._clients.forEach( ( client : any ) => {
			if(client.id === this._idClient ) {
				_client = client; 
			}
		});
		return _client;

	}

	@Output() idClientChange = new EventEmitter();

	@Output() clientChange = new EventEmitter();

	@Output() clefChange = new EventEmitter();
	
	@Input()
	set idClient( idClient:number ) {
		this._idClient =  idClient;
	}

	@Input()
	set client( client: IEntity) {

	}

	@Input()
	set clef( key : number ) {

	}

	@Input()
	set withClef( withClef:boolean ) {
		if( withClef) {
			this._withClef = true;
		} else {
			this._withClef = false;
		}
	}
}