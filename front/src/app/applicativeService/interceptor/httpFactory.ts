import { XHRBackend, 
			Http,
			RequestOptions }				from "@angular/http";
import { Router }             from '@angular/router';


import { InterceptedHttp } 					from "./InterceptedHttp";
import { TokenService }						from './../token/service'

export function httpFactory(
		xhrBackend: XHRBackend, 
		requestOptions: RequestOptions, 
		tokenService: TokenService, 
		router: Router 
	): Http {
    	return new InterceptedHttp(xhrBackend, requestOptions, tokenService, router );
}