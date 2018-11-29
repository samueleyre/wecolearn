import { Component, Input }		from '@angular/core';

@Component({
	selector: 'language',
	template: `
		<span *ngIf="_idLanguage==1">Français</span>
		<span *ngIf="_idLanguage==2">Anglais</span>`
})
export class LanguageComponent {
	
	public _idLanguage:number=1;

	@Input()
	set idLanguage( value : number){
		this._idLanguage = value;
	}
}