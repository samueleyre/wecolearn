import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
 
@Injectable()
export class TokenService {
    
    public token: string;
 
    public set( token: string ): void {
        localStorage.setItem('token', token );
    }
 
    public get(): string|null {
        return localStorage.getItem('token');
    }

    public function clear() : void {
        localStorage.removeItem('token');
    }
}