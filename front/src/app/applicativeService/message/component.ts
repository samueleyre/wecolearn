import { Component, Injectable, OnInit }	from '@angular/core';

import { Message }							from './model';
import { MessageService }					from './service';
@Component({
	templateUrl : 'template.html',
	selector : 'message',
	styleUrls : ['style.scss']
})

@Injectable()
export class MessageComponent implements OnInit {

	public hidden: boolean = true;
	public message: string = '';
	public type: string = '';

	ngOnInit() {
		MessageService.get().subscribe(( message: Message) => {
			console.log(this.message)
			this.message = message.body;
			this.hidden = false;
			this.type = message.type;
			let element = document.getElementById( 'message');
            if ( element ) {
                element.scrollIntoView(false);	
            }
            if (message.type === "cookie") {

			} else {
				setTimeout(() => {
					this.hidden = true;
				}, message.duration);
			}
		});
	}

	close() {
        localStorage.setItem('cookieseen', 'yes');
		this.hidden = true;
	}
}