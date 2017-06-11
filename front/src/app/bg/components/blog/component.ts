import { 
        Component, 
        OnInit,
        Injectable 
   }                             from '@angular/core';
import { NgForm }             from '@angular/forms';

import { Blog }                    from './model'; 
import { BlogService }             from './service';
import { PopinConfirmService }    from './../../../applicativeService/popin/confirm/service';

@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class BlogComponent implements OnInit {
    
    blogs: Array<Blog> = [];
    blog: Blog;
    edition:boolean = false;
    
    constructor( private service: BlogService, private confirm: PopinConfirmService ) {
        this.blog = new Blog();
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

    submit(f:NgForm) {
        
        if(this.edition) {
            this.service.patch( this.blog ).subscribe( 
                    blogs => this.blogs = blogs, 
                    error => { console.log(error) }
                );
            this.edition = false;

        } else {
           this.service.post(this.blog).subscribe(
               blogs => {
                   this.blogs = blogs;
               },
               error => { console.log(error) }
           ); 
        }
        this.blog = new Blog();
        f.resetForm();
    }

    edit( id : number ) {
        for( let i in this.blogs ) {
            if( this.blogs[i].id === id ) {
                this.blog = this.blogs[i];
                this.edition = true;
            }
        }
    }

    delete( id : number ) {

        this
        .confirm
        .setMessage( `Vous allez supprimer ce blog, êtes vous sûr ?`)
        .subscribe( confirm => {
            if( true == confirm ) {
                this.service.delete( id ).subscribe(
                    blogs => this.blogs = blogs,
                    error => {
                        console.log('ERRORS', error );
                    }
                )
            } else {
                console.log('CONFIRMATION', confirm );
            }
        });
    }
}