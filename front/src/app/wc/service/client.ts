
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client } from './../entities/client/entity';
import {Http, Response} from "@angular/http";




@Injectable()
export class ClientService {

    private endpoint: string;
    private currentClient : Client = null;

    constructor(private http: Http) {
        this.endpoint = '/api/client';
    }

    get(): Observable<Client> {
        if (this.currentClient) {
            return Observable.of(this.currentClient); // is this a hack ?
        } else {
            return this.http.get(`${this.endpoint}`)
                .map((response: Response) => {
                    this.currentClient = response.json();
                    return response.json();
                });

        }
    }




}