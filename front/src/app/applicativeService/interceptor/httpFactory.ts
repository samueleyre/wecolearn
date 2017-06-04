import { XHRBackend, 
			Http,
			RequestOptions }				from "@angular/http";
import { InterceptedHttp } 					from "./InterceptedHttp";
import { TokenService }						from './../token/service'

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, tokenService: TokenService ): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, tokenService );
}