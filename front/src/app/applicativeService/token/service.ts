import { Injectable }               from '@angular/core';
import { LocalStorageService }       from 'angular-2-local-storage';

 
@Injectable()
export class TokenService {
    
    public token: string;

    constructor( private localStorage: LocalStorageService ) {}
 
    public set( token: string ): void {
        this.localStorage.set('token', token );
        
    }
 
    public get(): any {
        return this.localStorage.get('token');
    }

    public clear(): void {
        this.localStorage.remove('token');
    }
}