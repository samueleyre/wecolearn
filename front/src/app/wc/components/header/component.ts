import { Component , Injectable, Inject, OnInit }		from '@angular/core';
import { Http }									from '@angular/http';
import { Logged }								from './../../../applicativeService/authguard/logged';
import { APP_BASE_HREF, Location } from '@angular/common';
import { Router } from '@angular/router';

import { GPPDComponent }             from './../../component/gppd';

import {AuthenticationService}        from './../../../applicativeService/authentication/service';
import {MessageService} from "../../../applicativeService/message/service";


@Component({
	selector : 'wc-header',
	templateUrl : 'template.html',
	styleUrls : ['style.scss']
})

@Injectable()
export class HeaderComponent implements OnInit {

    private location: Location;
    private logoPath: string;
	private baseUrl: string;
	private connected: boolean;

	constructor( private http : Http,
				 private router: Router,
				 location: Location,
				 @Inject(APP_BASE_HREF) r:string, ) {
        this.location = location;
        this.baseUrl = r;
        router.events.subscribe(event =>
		this.load());
	}

	ngOnInit() {
		this.load();
	}

	load() {

		this.logoPath = GPPDComponent.updateUrl('/logo/wecolearn.png');

        Logged.get().subscribe( (logged:boolean) => {
        	this.connected = logged;
        });
		if ( !localStorage.getItem('cookieseen')) {
        	MessageService.cookie();
		}
	}



}