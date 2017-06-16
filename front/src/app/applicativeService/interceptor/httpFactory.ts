import { XHRBackend, 
			Http,
			RequestOptions }				from "@angular/http";
import { Router }             				from '@angular/router';


import { InterceptedHttp } 					from './InterceptedHttp';
import { TokenService }						from './../token/service'
import { HeaderBag }						from './header-bag';	
export function httpFactory(
		xhrBackend: XHRBackend, 
		requestOptions: RequestOptions, 
		tokenService: TokenService, 
		router: Router, 
		headerBag: HeaderBag 
	): Http {
    	return new InterceptedHttp(xhrBackend, requestOptions, tokenService, router, headerBag );
}