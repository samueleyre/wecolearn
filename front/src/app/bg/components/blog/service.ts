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

	patch(blog:Blog ): Observable<Blog[]> {
		return this.http.patch(`${this.route}`, { id : blog.id , name : blog.name, url : blog.url, login : blog.login, pass: blog.pass}).map((response: Response) => {
				return response.json();
			})
		;
	}

	post(blog:Blog ): Observable<Blog[]> {
		return this.http.post(`${this.route}`, { id : blog.id , name : blog.name, url : blog.url, login : blog.login, pass: blog.pass}).map((response: Response) => {
				return response.json();
			})
		;
	}

	delete(id: number  ): Observable<Blog[]> {
		return this.http.delete(`${this.route}/${id}`).map((response: Response) => {
				return response.json();
			})
		;
	}
}