import { Component,  
		 Output, 
		 EventEmitter
				}				from '@angular/core';
import { PaginationService }	from './service';

@Component({
	selector : 'select-pagination',
	template : 
	`
	<label for="perPage">Par page</label>
	<select [(ngModel)]="value" id="perPage" class="form-control" (ngModelChange)="modelChange($event)">
		<option *ngFor="let _elt of values" value="{{ _elt }}">{{ _elt }}</option>
	</select>
	`
})

export class SelectPaginationComponent {

	protected values = [7, 10, 20, 30, 40];
	protected value = 20;
	@Output() public reload : EventEmitter<number> = new EventEmitter();

	protected modelChange( value : number) {
		PaginationService.perPage( value );
		this.reload.emit( value );
	}
}