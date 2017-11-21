import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from './../entities/client/entity';
import {Http, Response} from "@angular/http";
import {IEntity} from "../entity/interface";
import {Message} from "../entities/message/entity";


@Injectable()
export class ClientService {

  private currentClient = new Subject<Client>();
  private endpoint: string;


  constructor(private http: Http) {
      this.endpoint = '/api/client';
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


  load(): Observable<string>  {
      return this.http.get(`${this.endpoint}`)
          .map((response: Response) => {
              this.currentClient.next(response.json()[0]);// TODO :  should not be an array
              return 'loaded';
          });
  }



}