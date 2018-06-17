import { Component , Injectable, Inject, OnInit }		from '@angular/core';
import {Http, Response} from '@angular/http';
import { Logged }								from './../../../applicativeService/authguard/logged';
import { APP_BASE_HREF, Location } from '@angular/common';
import { Router } from '@angular/router';

import { GPPDComponent }             from './../../component/gppd';

import {AuthenticationService}        from './../../../applicativeService/authentication/service';
import {LoggerService}        from './../../../applicativeService/logger/service';
import {MessageService} from "../../../applicativeService/message/service";

// messages ----
import * as _ from 'lodash';

import { ClientService } from './../../service/client';
import { MessagesService } from './../../service/messages';
import { ThreadsService } from './../../service/threads.service';
import { Thread } from '../../entities/thread/entity';
import { Message } from '../../entities/message/entity';
import { Client } from '../../entities/client/entity';
import {ChatExampleData} from "../client/chat/data/chat-example-data";
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from "rxjs/Rx";
// import { GPPDComponent }          from './../../component/gppd';

import { LoggedService } from './../../service/logged';



@Component({
	selector : 'wc-header',
	templateUrl : 'template.html',
	styleUrls : ['style.scss'],
	providers : [NgbDropdownConfig]
})

@Injectable()
export class HeaderComponent implements OnInit {

    private location: Location;
    private logoPath: string;
    private imagePath: string;
		private baseUrl: string;
		private connected: boolean = false;
		private screen : boolean = false;
    public unreadMessagesCount: number;
    private searchBarType: string = "tag";
		private searchBarTypeChecked : any = false;
		private notifications: Array<Thread>;
		private currentClient : Client = new Client;
		private collapseClass: string = "collapse";
    private threads: Observable<any>;

      constructor( private http : Http,
             private router: Router,
             location: Location,
             @Inject(APP_BASE_HREF) r:string,
             public messagesService: MessagesService,
             public threadsService: ThreadsService,
             public ClientService: ClientService ,
             private config: NgbDropdownConfig,
             private LoggedService: LoggedService,
             private authenticationService: AuthenticationService,
             private loggerService: LoggerService
) {

        config.placement = 'bottom-right';
        this.location = location;
        this.baseUrl = r;
        // router.events.subscribe(event => TODO : make this work better, called severaltimes at the moment
		// this.load());
	}

	ngOnInit() {
      this.imagePath = GPPDComponent.updateUrl('/img/');
      this.screen = GPPDComponent.getScreenSize();
  	  this.ClientService.get().subscribe((client: Client )=> {
          this.loggerService.log("got client", client)
				this.currentClient = client;
			});
			this.logoPath = GPPDComponent.updateUrl('/logo/wecolearn.png');
      Logged.get().subscribe( (logged:boolean) => {
        this.connected = logged;
        if (logged) {
          this.loadClient();
          this.loadMessages();
        }
			});

	}

	chooseSearchBarType(choice: string) {


				if (this['searchBarType'] !== choice) {
					document.getElementById("filter-"+choice).setAttribute("data-selected", "true");
					let otherChoice:string = choice === "tag" ? "map" : "tag";
					document.getElementById("filter-"+otherChoice).setAttribute("data-selected", "false");
          this.searchBarTypeChecked = choice === "map";
					this.searchBarType = choice;
				}

	}


/*
	load() {

		// this.loggerService.log("header, is it logged ? ", this.connected);



    //
		// if ( !localStorage.getItem('cookieseen')) {
     //    	MessageService.cookie();
		// }

	}

*/


	loadMessages() {

		this.messagesService.init();

		this.threadsService.orderedThreads.subscribe( (currentThreads: Array<Thread>) => {

			this.notifications = [];

			_.map(currentThreads, (currentThread: Thread) => {

				const messageIsFromUser: boolean = currentThread.lastMessage.sender &&
																	this.currentClient &&
																(currentThread.lastMessage.sender.id === this.currentClient.id);
					if (!currentThread.lastMessage.is_read && !messageIsFromUser && currentThread.lastMessage.sender) {
                        this.loggerService.log("THREADS", currentThread);

                        this.notifications.push(currentThread)
					}

			});

			if (this.notifications.length > 0) {
				this.unreadMessagesCount = this.notifications.length;
			} else {
				this.unreadMessagesCount = null;
			}

		});

		this.messagesService.initTimer();

	}



	loadClient() {
        this.ClientService.load().subscribe();
	}

	preventDefault(e:any) {
    	e.preventDefault();
	}

  activateNotification(thread: Thread): void {
    this.threadsService.setCurrentThread(thread);
    this.messagesService.pushUpdatedMessages().subscribe(() => {
      this.loggerService.log("header --> search")
      this.router.navigate(['/search']);
		});
  }

  collapse() {
		(this.collapseClass === "collapse") ? this.collapseClass = null: this.collapseClass = "collapse";

	}

	logOut() {

    this.authenticationService.logout();
		this.messagesService.stopNewMessageLoop();
    this.router.navigate(['/']);


	}



}