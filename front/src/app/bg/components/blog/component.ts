import { 
        Component, 
        OnInit 
   }                             from '@angular/core';

import { Blog }                    from './model'; 
import { BlogService }             from './service';

@Component({
    templateUrl: 'template.html'
})
 
export class BlogComponent implements OnInit {
    
    blogs: Array<Blog> = [];
    
    constructor( private service: BlogService ) {

    } 
    
    ngOnInit() {
        this.load();
        
    }

    private load() : void {
        this.service.get().subscribe( blogs => {
            this.blogs  = blogs;
        })
    }
 
    change(event: number ) : void {
        this.load();
    } 
}