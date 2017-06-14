import { Component, Input, Output, EventEmitter,OnChanges } from '@angular/core';

@Component({
	selector: 'select-language',
	template : `<select [(ngModel)]="_idLanguage" (ngModelChange)="onChange($event)"class="form-control">
  					<option value="1">Français</option>
  					<option value="2">Anglais</option>
  				</select>`,
})
export class SelectLanguageComponent {

	_idLanguage:number;

	constructor() {
		this._idLanguage = 1;
	}

	onChange( newValue:number ) {
		this._idLanguage  = parseInt(newValue);
		this.idLanguageChange.emit(this._idLanguage);
	}

	@Output() idLanguageChange = new EventEmitter();
	
	@Input()
	set idLanguage( val:number ) {
		this._idLanguage = val;
		
	}

}