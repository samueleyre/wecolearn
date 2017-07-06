import { Component, 
		Input, 
		Injectable, 
		OnInit,
		EventEmitter } 				    from '@angular/core';
import { Http } 					from '@angular/http';
import 'rxjs/add/operator/map';

import { Client }						from './../../../components/client/entity';
import { PaginationService } 		from './../../../../applicativeService/pagination/service';
import { CacheUrlService } 			from './../../../../applicativeService/cache_url/service';

@Component({
	selector: 'display-client',
	template : 	`<span>{{ name }}</span>`
})
@Injectable()
export class DisplayClientComponent implements OnInit {

	public clients: Client[];
	public name : string = '';
	private loaded : EventEmitter<Client[]> = new EventEmitter();

	constructor( protected http: Http , protected cache : CacheUrlService ) {
	
	}

	ngOnInit(): void {
		this.load();
	}

	private load() {
		
		let endpoint = '/api/clients';
		this.cache.get(endpoint)
		.subscribe( ( clients:Client[] ) => {
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