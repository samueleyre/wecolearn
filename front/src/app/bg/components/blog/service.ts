import { Injectable }			from '@angular/core';
import { Http, Response }		from '@angular/http';

import { Observable } 			from 'rxjs';
import 'rxjs/add/operator/map'

import { Blog }        			from './model';


@Injectable()
export class BlogService {

	route: string = '/api/blogs';
	
	constructor( private http : Http ) {}

	get(): Observable<Blog[]> {
		return this.http.get(`${this.route}`).map((response: Response) => {
				return response.json();
			})
		;
	}
}