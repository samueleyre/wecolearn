import { Component , Injectable, OnInit }		from '@angular/core';
import { Http }									from '@angular/http';
@Component({
	selector : 'bg-header',
	templateUrl : 'template.html'
})

@Injectable()
export class HeaderComponent implements OnInit {

	public display : boolean = false;

	constructor( private http : Http ) {}
	
	ngOnInit() {
		this.http.get('/api/ping').map( response => {
			if( response.status !== 200 ) {
				this.display = false;
			} else {
				this.display = true;
			}
			return this.display;
		}).subscribe();
	}
}