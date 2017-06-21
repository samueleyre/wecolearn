import { IEntity }			from './../../entity/interface';
import { Entity }			from './../../entity/entity'

export class Masse extends Entity {
	
	public totalNumberProgrammation:number=1;

	public neutralSentenceNumberMin:number=20;

	public neutralSentenceNumberMax:number=40;

	public blogs:IEntity[];

	public name:string='Le nom de la programmation';

	public isPage:number=1;

	public idLanguage:number=1;

	public client:IEntity;

	public anchorSentenceNumber:number=1;

	public isBlank:number=1;

	public pause:number=600;

	public titleOption:number=1;
}