
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public newToken: string = null;

  constructor(private localStorage: LocalStorage) {
    this.newToken = null;
  }

  public set(token: string): void {
    this.newToken = token;
    this.localStorage.setItemSubscribe('token', token);
  }

  public getAsObs(): Observable<string> {
    return <Observable<string>>this.localStorage.getItem<string>('token');
  }

  public hasAsObs(): Observable<boolean> {
    return <Observable<boolean>>this.localStorage.getItem<boolean>('token');
  }


  // public get(): string {
  //   return localStorage.getItem('token');
  // }

  public clear(): void {
    this.localStorage.removeItem('token').subscribe();
  }
}
