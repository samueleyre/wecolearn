import { Component, 
		Input, 
		Injectable, 
		OnInit,
		EventEmitter } 				    from '@angular/core';
import { Http } 					from '@angular/http';
import 'rxjs/add/operator/map';

import { Client }						from './../../../components/client/entity';
import { PaginationService } 		from './../../../../applicativeService/pagination/service';

@Component({
	selector: 'display-client',
	template : 	`<span>{{ name }}</span>`
})
@Injectable()
export class DisplayClientComponent implements OnInit {

	public clients: Client[];
	public name : string = '';
	private loaded : EventEmitter<Client[]> = new EventEmitter();

	constructor( protected http: Http ) {
	
	}

	ngOnInit(): void {
		this.load();
	}

	private load() {
		
		PaginationService.disable();
		let endpoint = '/api/clients';
		this.http.get(endpoint)
		.map( response   => {
			return response.json();
		}).subscribe( ( clients:Client[] ) => {
			this.clients = clients;
			this.loaded.emit( clients);
		});
	}

	@Input()
	set idClient( idClient : number ) {
		this.loaded.subscribe( ( clients: Client[]) => {
			clients.forEach( ( client: Client) => {
				if( client.id == idClient ){ 
					this.name = client.name;
				}
			});
		});
	}
}