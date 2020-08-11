import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggedService {
  private logged = false;


  constructor() {
    // Logged.get().subscribe((logged: boolean) => {
    //   this.logged = logged;
    //   if (this.logged) {
    //     this.clientService.load().subscribe();
    //   }
    // });
  }

  get(): any {
    return this.logged;
  }
}
