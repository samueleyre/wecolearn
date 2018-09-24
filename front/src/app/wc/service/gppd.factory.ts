// import {Http, Response} from "@angular/http";
import {HttpClient} from "@angular/common/http";


import { GPPDService }	from './gppd';

// TODO ne fonctionne pas en l'état, n'envoie qu'une seule instance : 
// Il semblerait que la factory soit un singleton.
export function GPPDFactory ( http: HttpClient ) : GPPDService {
		return new GPPDService( http );
}