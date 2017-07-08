import { 
        Component, 
        OnInit,
        Injectable,
      }                                  from '@angular/core';

import { Http }                          from '@angular/http';

import { Blog }                          from './../blog/entity';




@Component({
    templateUrl: 'template.html',
})

@Injectable()
export class DownComponent implements OnInit {
    
    public blogs: Blog[] = [];
    
    constructor( protected http : Http ) {
        
    } 
    
    ngOnInit() {
        this
        .http
        .get('/api/downs').map( response => {
            return response.json();
        })
        .subscribe( ( blogs: Blog[]) => {
            this.blogs = blogs;
        })
        
    }
}