import { Component , Injectable, Inject, OnInit }		from '@angular/core';
import {Http, Response} from '@angular/http';
import { Logged }								from './../../../applicativeService/authguard/logged';
import { APP_BASE_HREF, Location } from '@angular/common';
import { Router } from '@angular/router';

import { GPPDComponent }             from './../../component/gppd';

import {AuthenticationService}        from './../../../applicativeService/authentication/service';
import {MessageService} from "../../../applicativeService/message/service";

// messages ----
import * as _ from 'lodash';

import { ClientService } from './../../service/client';
import { MessagesService } from './../../service/messages';
import { ThreadsService } from './../../service/threads.service';
import { Thread } from '../../entities/thread/entity';
import { Message } from '../../entities/message/entity';
import {ChatExampleData} from "../client/chat/data/chat-example-data";


@Component({
	selector : 'wc-header',
	templateUrl : 'template.html',
	styleUrls : ['style.scss']
})

@Injectable()
export class HeaderComponent implements OnInit {

    private location: Location;
    private logoPath: string;
	private baseUrl: string;
	private connected: boolean;
    unreadMessagesCount: number;


    constructor( private http : Http,
				 private router: Router,
				 location: Location,
				 @Inject(APP_BASE_HREF) r:string,
                 public messagesService: MessagesService,
                 public threadsService: ThreadsService,
                 public ClientService: ClientService
	) {
        this.location = location;
        this.baseUrl = r;
        ChatExampleData.init(messagesService, threadsService, ClientService);
        // router.events.subscribe(event => TODO : make this work better, called severaltimes at the moment
		// this.load());
	}

	ngOnInit() {
		this.load();
	}

	load() {

		this.logoPath = GPPDComponent.updateUrl('/logo/wecolearn.png');

        Logged.get().subscribe( (logged:boolean) => {
        	this.connected = logged;
			this.loadMessages();
			this.loadClient();
        });
		if ( !localStorage.getItem('cookieseen')) {
        	MessageService.cookie();
		}

	}

	loadMessages() {

    	this.messagesService.init();

        this.messagesService.messages
            .combineLatest(
                this.threadsService.currentThread,
                (messages: Message[], currentThread: Thread) =>
                    [currentThread, messages] )

            .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
                this.unreadMessagesCount =
                    _.reduce(
                        messages,
                        (sum: number, m: Message) => {
                            const messageIsInCurrentThread: boolean = m.thread &&
                                currentThread &&
                                (currentThread.id === m.thread.id);
                            // note: in a "real" app you should also exclude
                            // messages that were authored by the current user b/c they've
                            // already been "read"
                            if (m && !m.isRead && !messageIsInCurrentThread) {
                                sum = sum + 1;
                            }
                            return sum;
                        },
                        0);
            });


	}

    loadClient() {
        this.ClientService.load().subscribe();
	}



}