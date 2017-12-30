import { Injectable } from '@angular/core';
import {Logged} from "../../applicativeService/authguard/logged";


@Injectable()
export class LoggedService {

  private logged: boolean = false;


  constructor() {
    Logged.get().subscribe( (logged:boolean) => {

      console.log(" logged", logged)
      if (logged) {
        this.logged = true;
      } else {
        this.logged = false;
      }

    });

  }

  get(): any {

    return this.logged;

  }


}
