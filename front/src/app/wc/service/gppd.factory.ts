import { Http }			from '@angular/http';
import { GPPDService }	from './gppd';

// TODO ne fonctionne pas en l'état, n'envoie qu'une seule instance : 
// Il semblerait que la factory soit un singleton.
export function GPPDFactory ( http: Http ) : GPPDService { 
		return new GPPDService( http );
}