import { Component, Injectable, OnInit }	from '@angular/core';

import { Message }							from './model';
import { MessageService }					from './service';
@Component({
	templateUrl : 'template.html',
	selector : 'message'
})

@Injectable()
export class MessageComponent implements OnInit {

	public hidden: boolean = true;
	public message: string = '';

	ngOnInit() {
		MessageService.get().subscribe((message: Message) => {
			this.message = message.body;
			this.hidden = false;
			let element = document.getElementById( 'message');
            if ( element ) {
                element.scrollIntoView();
            }
			setTimeout(() => {
				this.hidden = true;
			}, message.duration);
		})

	}

}