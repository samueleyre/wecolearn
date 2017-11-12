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


    load(): Observable<string>  {
        console.log('Clientservice called')
        return this.http.get(`${this.endpoint}`)
            .map((response: Response) => {
                console.log("client response", response)
                this.currentClient.next(response.json()[0]);// TODO :  should not be an array
                return 'loaded';
            });
    }

    // loadMessages(): void{
    //
    //     joinedMessages.map( (message: Message) => messagesService.addMessage(message) )
    //
    //
    // }



}