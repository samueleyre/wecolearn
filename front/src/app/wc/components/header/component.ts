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
import { Client } from '../../entities/client/entity';
import {ChatExampleData} from "../client/chat/data/chat-example-data";
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
// import { GPPDComponent }          from './../../component/gppd';


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
	private connected: boolean;
    public unreadMessagesCount: number;
    private searchBarType: string = "tag";
	private searchBarTypeChecked : any = false;
	private notifications: Array<Message>;
	private currentClient : Client = new Client;

      constructor( private http : Http,
				 private router: Router,
				 location: Location,
				 @Inject(APP_BASE_HREF) r:string,
				 public messagesService: MessagesService,
				 public threadsService: ThreadsService,
				 public ClientService: ClientService ,
				 private config: NgbDropdownConfig
	) {

        config.placement = 'bottom-right';
        this.location = location;
        this.baseUrl = r;
        // ChatExampleData.init(messagesService, threadsService, ClientService);
        // router.events.subscribe(event => TODO : make this work better, called severaltimes at the moment
		// this.load());
	}

	ngOnInit() {
      this.imagePath = GPPDComponent.updateUrl('/img/');
  	  this.ClientService.get().subscribe((client: Client )=> {
  		console.log("got client", client)
  		this.currentClient = client;
		});
		this.load();
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


	load() {

		this.logoPath = GPPDComponent.updateUrl('/logo/wecolearn.png');

        Logged.get().subscribe( (logged:boolean) => {
        	this.connected = logged;
			this.loadClient();
			this.loadMessages();
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
            	let oldValue = this['unreadMessagesCount'];
            	this.notifications = [];
                this.unreadMessagesCount =
                    _.reduce(
                        messages,
                        (sum: number, m: Message) => {
                            const messageIsInCurrentThread: boolean = m.thread &&
                                currentThread &&
                                (currentThread.id === m.thread.id);

                            const messageIsFromUser: boolean = m.sender &&
                                this.currentClient &&
															  (m.sender.id === this.currentClient.id);

                            if (m && !m.is_read && !messageIsInCurrentThread && !messageIsFromUser && m.sender) {
                              this.notifications.push(m);
                            	sum = sum + 1;
                            }
                            return sum;
                        },
                        0);
                // console.log("diff", oldValue, this['unreadMessagesCount'])

            });

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
      this.router.navigate(['/search']);
		});
  }



}