import { Injectable }              from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable }              from 'rxjs';
import { User }                    from './model';
import 'rxjs/add/operator/map'
 
@Injectable()
export class UserService {
    
    private endpoint: string;
    private newUserEndpoint: string;

    constructor( private http: HttpClient ) {
        this.endpoint = '/api/users';
        this.newUserEndpoint = '/api/newuser';
    }
 
    get(): Observable<User[]> {
        return this.http.get(`${this.endpoint}`)
            .map((response: any ) => {
                // login successful if there's a jwt token in the response
                return response;
            });    
    }
 
    patch( user: User ): Observable<any> {
        // clear token remove user from local storage to log user out
        return this.http.patch(`${this.endpoint}`, { id : user.id, username : user.username , email : user.email, password : user.password })
            .map( (response: any ) => {
                // login successful if there's a jwt token in the response
                return response;
            });
    }

    post( user: User ): Observable<any> {
        // clear token remove user from local storage to log user out
        return this.http.post(`${this.newUserEndpoint}`, { id : user.id, username : user.username , email : user.email, password : user.password })
            .map((response: any ) => {
                // console.log(response)
                // login successful if there's a jwt token in the response
                return response;
            });
    }

    delete( id : number ): Observable<User[]> {
        // clear token remove user from local storage to log user out
        return this.http.delete(`${this.endpoint}/${id}`)
            .map((response: any ) => {
                // login successful if there's a jwt token in the response
                return response;
            });
    }
}