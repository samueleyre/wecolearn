import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from './../entities/client/entity';
import {Http, Response} from "@angular/http";
import {IEntity} from "../../applicativeService/entity/interface";
import {Message} from "../entities/message/entity";
import {LoggerService} from "../../applicativeService/logger/service";


@Injectable()
export class ClientService {

  private currentClient = new Subject<Client>();
  private endpoint: string;
  private cClientOb: Observable<Client>;
  private cClientNu: Client = null;


  constructor(private http: Http, private loggerService: LoggerService) {
      this.endpoint = '/api/client';
  }

  getOb(): any {

    return this.cClientOb;

  }

  getCli() : any {
    return this.cClientNu;
  }

  get(api : boolean = false): Observable<Client> {

      return this.currentClient.asObservable();

  }

  pull(): Observable<Array<Message>>  { // TODO : probably check for any kind of update, if other
    return this.http.get('/api/checknewmessage')
      .map((response: Response) => {
        return response.json();
      });
  }

  changeParameter(data: object): Observable<any> {
    return this.http.post('/api/client/changesettings', data)
      .map((response: Response ) => {
        return response.json();
    });
  }


  load(): Observable<string>  {
      return this.http.get(`${this.endpoint}`)
          .map((response: Response) => {
              this.currentClient.next(response.json());
              this.cClientNu = response.json();
              this.loggerService.log("loaded", response.json())
              return 'loaded';
          });
  }

}
