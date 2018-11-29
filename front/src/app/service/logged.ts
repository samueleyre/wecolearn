import { Injectable } from '@angular/core';
import {Logged} from "../applicativeService/authguard/logged";
import {LoggerService} from "../applicativeService/logger/service";


@Injectable()
export class LoggedService {

  private logged: boolean = false;


  constructor(private loggerService: LoggerService) {
    Logged.get().subscribe( (logged:boolean) => {
      this.logged = logged;
    });

  }

  get(): any {

    return this.logged;

  }



}
