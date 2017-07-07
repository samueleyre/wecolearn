import { Component , Injectable, OnInit }		from '@angular/core';
import { Http }									from '@angular/http';
import { Logged }								from './../../../applicativeService/authguard/logged';
@Component({
	selector : 'bg-header',
	templateUrl : 'template.html'
})

@Injectable()
export class HeaderComponent implements OnInit {

	public display : boolean = false;

	constructor( private http : Http ) {}
	
	ngOnInit() {
		Logged.get().subscribe( (logged:boolean) => {
			this.display = logged;
		});
	}
}