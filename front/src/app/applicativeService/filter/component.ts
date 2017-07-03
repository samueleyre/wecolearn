import { Component,
			Input,
			Output,
			Injectable,
			EventEmitter
 }									from '@angular/core';
import { FilterService }			from './service';

@Component({
	selector : `filter`,
	template : `<button class="btn" (click)="filter()">Filtrer</button>
				<button class="btn" (click)="clear()">Réinitisalier</button>`
})
@Injectable()
export class FilterComponent {

	@Input() public  field: string;
	@Input() public  model:any
	@Output() public modelChange:EventEmitter<number> = new EventEmitter();
	@Output() public reload:EventEmitter<null> = new EventEmitter(); 

	constructor() {

	}

	filter() {
		FilterService.addFilter( this.field, this.model);
		this.reload.emit(null);
	}

	clear() {
		FilterService.clear();
		this.modelChange.emit( null );
		this.reload.emit(null);
	}
}