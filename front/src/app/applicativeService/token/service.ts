import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
 
@Injectable()
export class TokenService {
    
    public token: string;
 
    public set( token: string ): void {
        window.localStorage.setItem('token', token );
    }
 
    public get(): string|null {
        return window.localStorage.getItem('token');
    }

    public clear(): void {
        window.localStorage.removeItem('token');
    }
}