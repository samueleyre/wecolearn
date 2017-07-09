import { Component, Input, Output, EventEmitter,OnChanges, OnInit, Injectable, Inject } from '@angular/core';
import { Http } 				from '@angular/http';
import 'rxjs/add/operator/map';

import { PaginationService } 	from './../../../../applicativeService/pagination/service';

@Component({
	selector: 'select-hebergeur',
	template : `<select [(ngModel)]="_idHost" (ngModelChange)="onChange($event)" class="form-control">
  					<option *ngFor="let host of _hosts" value="{{ host.id }}">{{ host.name }}</option>
  				</select>`,
  	
})
@Injectable()
export class SelectHebergeurComponent implements OnInit {

	_idHost:any;
	_hosts: any = [];

	constructor( protected http: Http ) {
		this._idHost = null;
	}

	ngOnInit(): void {
		this.load();
	}

	private load() {
		PaginationService.disable();
		let api = '/api/hebergeurs';
		this.http.get(api)
		.map( response   => {
			return response.json();
		}).subscribe( hosts => {
			this._hosts = hosts;
			if( typeof hosts === 'object' && hosts !== null && typeof this._hosts[0] !== 'undefined') {
				this.onChange( this._hosts[0].id ); 
			}
		});
	}

	onChange( newValue:string ) {	
		this._idHost  = parseInt(newValue);
		this.idHebergeurChange.emit( this._idHost );
	}

	
	@Output() idHebergeurChange = new EventEmitter();

	@Input()
	set idHebergeur( idHost:number ) {
		this._idHost =  idHost;
	}
}