import { Component, 
		Input, 
		Injectable,
		OnInit,
		EventEmitter } 				from '@angular/core';
import { Http } 					from '@angular/http';
import 'rxjs/add/operator/map';

import { Blog }						from './../../../components/blog/entity';
import { PaginationService } 		from './../../../../applicativeService/pagination/service';
import { CacheUrlService } 			from './../../../../applicativeService/cache_url/service';


@Component({
	selector: 'display-blog',
	template : 	`<span><a href="{{ url }}/?p={{ pageId }}" target="_blank">{{ name }}</a></span>`
})
@Injectable()
export class DisplayBlogComponent implements OnInit {

	public blogs: Blog[];
	public url : string = '';
	public name : string = '';
	private loaded : EventEmitter<Blog[]> = new EventEmitter();

	@Input() public pageId : number;

	constructor( protected http: Http, protected cache : CacheUrlService ) {
		
	}

	ngOnInit(): void {
		this.load();
	}

	private load() {
		
		let endpoint = '/api/blogs';
		this
		.cache
		.get(endpoint )
		.subscribe( ( blogs:Blog[] ) => {
			this.blogs = blogs;
			this.loaded.emit( blogs);
		});
	}

	@Input()
	set idBlog( idBlog : number ) {
		this.loaded.subscribe(( blogs: Blog[]) => {
			blogs.forEach( ( blog: Blog) => {
				if( blog.id == idBlog ){ 
					this.url = blog.url;
					this.name = blog.name;
				}
			});
		});
	}
}