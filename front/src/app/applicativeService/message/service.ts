import { EventEmitter }					from '@angular/core';
import { Message }						from './model';
export class MessageService {

	static emitter: EventEmitter<Message>;
	
	static getEmitter() : EventEmitter<Message> {
		if( ! MessageService.emitter ) {
			MessageService.emitter = new EventEmitter();
		}
		return MessageService.emitter;
	}

	static get():EventEmitter<Message> {
		 return MessageService.getEmitter();
	}

	static post( message:Message ) {
		return MessageService.getEmitter().emit(message);
	}

	static info( body : string ) {
		let message = new Message();
		message.body = body;
		MessageService.post(message);
	}
}