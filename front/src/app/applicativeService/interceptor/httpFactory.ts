import { XHRBackend, 
			Http,
			RequestOptions }				from "@angular/http";
import { Router }             				from '@angular/router';
import {LoggerService} from "./../logger/service";


import { InterceptedHttp } 					from './InterceptedHttp';
// import { AuthenticationInterceptor } 					from './auth-interceptor';
import { TokenService }						from './../token/service'
import { HeaderBag }						from './header-bag';	
export function httpFactory(
		xhrBackend: XHRBackend, 
		requestOptions: RequestOptions, 
		tokenService: TokenService, 
		router: Router, 
		headerBag: HeaderBag,
    loggerService: LoggerService
	): Http {
    	return new InterceptedHttp(xhrBackend, requestOptions, tokenService, router, headerBag, loggerService);
}