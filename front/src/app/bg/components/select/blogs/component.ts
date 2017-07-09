import { Component, Input, Output, EventEmitter,OnChanges, OnInit, Injectable } from '@angular/core';
import { Http } 					from '@angular/http';
import 'rxjs/add/operator/map';

import { Blog }						from './../../../components/blog/entity';
import { PaginationService } 		from './../../../../applicativeService/pagination/service';

@Component({
	selector: 'select-blogs',
	templateUrl : 	'template.html'
})
@Injectable()
export class SelectBlogsComponent implements OnInit {

	
	public _pages: any = [];
	private _blogs: Blog[] = [];
	public page: number = 0;
	public perPage : number = 20;
	public alive:boolean = false;
	public count: number = 0;


	constructor( protected http: Http ) {
	}

	ngOnInit(): void {
		this.load();
	}

	private load() {
		
		PaginationService.disable();
		let endpoint = '/api/blogs';
		if( this.alive ) {
			endpoint += '?alive=1';
			console.log(endpoint);
		}
		this.http.get(endpoint)
		.map( response   => {
			return response.json();
		}).subscribe( blogs => {
			console.log('set pages', true);
			this.setPages( blogs );
		});
	}

	aliveChange( newValue : boolean ) {
		this.alive = newValue;
		this.load();
	}

	private setPages( blogs: Blog[] ) : void {
		this._pages = [];
		this.count = blogs.length;
		blogs.forEach( ( blog:Blog, i:number ) => {
			let floor = Math.floor( i / this.perPage  );
			if( typeof this._pages[floor] === 'undefined') this._pages[floor] = [];
			this._pages[floor].push( { blog : blog , selected : false } ); 
		});
	}

	somePage(_page:number, event : any ) {
		this.page = _page;
		event.stopPropagation();
	} 

	onChange( blog: Blog, selected:boolean ): void  {
		let exist = false;
		let index;
		this._blogs.forEach(( _blog : Blog, _index : number ) => {
			if( _blog.id === blog.id ) {
				exist = true;
				index = _index;
			} 
		});
		let changed = false;
		if ( selected && ! exist ) {
			this._blogs.push( blog );
			changed = true;
		}
		if ( ! selected && exist ) {
			this._blogs.splice(index, 1);
			changed = true;
		}
		if ( changed ){ 
			this.blogsChange.emit( this._blogs ); 
			console.log( this._blogs );
		};
	}

	@Output() blogsChange = new EventEmitter();
	
	@Input()
	set blogs( blogs:Blog[] ) {
		if(typeof blogs !== 'undefined') this._blogs = blogs; 
		this._pages.forEach(( page:any, i:number ) => {
			page.forEach( ( element:any, j:number ) => {
				if( typeof this.blogs !== 'undefined' && typeof this.blogs.length !== 'undefined') {	
					this._blogs.forEach( ( blog: Blog ) => {
						if( blog.id === element.blog.id ) {
							this._pages[i][j].selected = true;
						}
					});
				}
			});
		});
	}
}