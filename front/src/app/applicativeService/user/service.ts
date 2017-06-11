import { Injectable }              from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }              from 'rxjs';
import { User }                    from './model';
import 'rxjs/add/operator/map'
 
@Injectable()
export class UserService {
    
    private endpoint: string;

    constructor( private http: Http ) {
        this.endpoint = '/api/users';
    }
 
    get(): Observable<User[]> {
        return this.http.get(`${this.endpoint}`)
            .map((response: Response ) => {
                // login successful if there's a jwt token in the response
                return response.json();
            });    
    }
 
    patch( user: User ): Observable<User[]> {
        // clear token remove user from local storage to log user out
        return this.http.patch(`${this.endpoint}`, { id : user.id, username : user.username , email : user.email, password : user.password })
            .map( (response: Response ) => {
                // login successful if there's a jwt token in the response
                return response.json();
            });
    }

    post( user: User ): Observable<User[]> {
        // clear token remove user from local storage to log user out
        return this.http.post(`${this.endpoint}`, { id : user.id, username : user.username , email : user.email, password : user.password })
            .map((response: Response ) => {
                // login successful if there's a jwt token in the response
                return response.json();
            });
    }

    delete( id : number ): Observable<User[]> {
        // clear token remove user from local storage to log user out
        return this.http.delete(`${this.endpoint}/${id}`)
            .map((response: Response ) => {
                // login successful if there's a jwt token in the response
                return response.json();
            });
    }
}