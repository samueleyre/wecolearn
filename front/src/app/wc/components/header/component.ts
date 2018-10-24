import { Component , Injectable, Inject, OnInit }		from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';
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
import { User } from '../../entities/user/entity';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from "rxjs/Rx";
// import { GPPDComponent }          from './../../component/gppd';

import { LoggedService } from './../../service/logged';
import {image} from "../../../applicativeService/constants/image";
import {DomainService} from "../../service/domain";



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
    private webPath: string;
		private baseUrl: string;
		private connected: boolean = false;
		private screen : boolean = false;
    public unreadMessagesCount: number;
    private searchBarType: string = "tag";
		private searchBarTypeChecked : any = false;
		private notifications: Array<Thread>;
		private currentClient : User = new User;
		private collapseClass: string = "collapse";
    private threads: Observable<any>;
    private baseImageName : string = image.default_200px;
    private subDomain: string = null;



  constructor( private http : HttpClient,
             private router: Router,
             location: Location,
             @Inject(APP_BASE_HREF) r:string,
             public messagesService: MessagesService,
             public threadsService: ThreadsService,
             public ClientService: ClientService ,
             private config: NgbDropdownConfig,
             private LoggedService: LoggedService,
             private authenticationService: AuthenticationService,
             private loggerService: LoggerService,
               private domainService: DomainService,


  ) {

        config.placement = 'bottom-right';
        this.location = location;
        this.baseUrl = r;
        this.router = router;
	}

	ngOnInit() {
    this.webPath = GPPDComponent.updateUrl('/')
    this.imagePath = this.webPath + "img/";
    this.subDomain = this.domainService.getSubDomain();
    // console.log(this.subDomain)


    this.logoPath = this.webPath+'logo/'+this.subDomain+".png";


    this.screen = GPPDComponent.getScreenSize();
    this.ClientService.get().subscribe((client: User )=> {
        this.loggerService.log("got client", client)
      this.currentClient = client;
    });
    Logged.get().subscribe( (logged:boolean) => {
      this.loggerService.log("logged ??? ", logged)
      this.connected = logged;
      if (logged) {
        this.loadClient();
        this.loadMessages();
      }
    });
    if ( !localStorage.getItem('cookieseen')) {
        MessageService.cookie();
   }
   this.router.events.subscribe(event => {

    })
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



	loadMessages() {

		this.messagesService.init();

		this.threadsService.orderedThreads.subscribe( (currentThreads: Array<Thread>) => {

			this.notifications = [];

			_.map(currentThreads, (currentThread: Thread) => {

				let messageIsFromUser: boolean = currentThread.lastMessage.sender &&
																	this.currentClient &&
																(currentThread.lastMessage.sender.id === this.currentClient.id);

					if (!currentThread.lastMessage.is_read && !messageIsFromUser && currentThread.lastMessage.sender) {
                        // this.loggerService.log("THREADS", currentThread);

                        this.notifications.push(currentThread)
					}

			});

			if (this.notifications.length > 0) {
				this.unreadMessagesCount = this.notifications.length;
			} else {
				this.unreadMessagesCount = null;
			}

		});

		// this.messagesService.initTimer();

	}



	loadClient() {
        this.ClientService.load().subscribe(); // todo: should be in main component
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

    this.authenticationService.logout(true);
		this.messagesService.stopNewMessageLoop();


	}



}