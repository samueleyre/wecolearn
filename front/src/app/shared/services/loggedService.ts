import { Injectable } from '@angular/core';

import { Logged } from './logged';
import { ClientService } from './client';


@Injectable()
export class LoggedService {
  private logged = false;


  constructor(private clientService: ClientService) {
    Logged.get().subscribe((logged: boolean) => {
      this.logged = logged;
      if (this.logged) {
        this.clientService.load().subscribe();
      }
    });
  }

  get(): any {
    return this.logged;
  }
}
