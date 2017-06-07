import { 
        Component, 
        OnInit,
        OnChanges 
   }                              from '@angular/core';
import { Router }                 from '@angular/router';
import { UserService }            from './../../applicativeService/user/service';
import { User }            from './../../applicativeService/user/model';



 
@Component({
    templateUrl: 'template.html'
})
 
export class UserComponent implements OnInit {
    
    user : User;
    users: User[];
    edition: boolean = false;
    
    constructor(
        private router: Router,
        private userService : UserService, 
    ) {
        this.users = [];
        this.user = new User('','','',0);
    }
 
    ngOnInit() {
        // reset login status
        
        this.userService.get().subscribe( users => {
                this.users = users;
            }, error => {
                console.log('Error in get comments', error );
            });

    }

   
    submit() {
        
        if(this.edition) {
            this.userService.patch( this.user ).subscribe( 
                    users => this.users = users, 
                    error => { console.log(error) }
                );
            this.edition = false; 
        } else {
           this.userService.post(this.user).subscribe(
               users => {
                   this.users = users;
                   console.log('NEW USERS', users ); 
               },
               error => { console.log(error) }
           ); 
           
        }
    }

    edit( id : number ) {
        this.edition = true;
        this.user = this.users[id];
    }

    delete( id : number ) {

        this.userService.delete( id ).subscribe(
            users => this.users = users,
            error => {
                console.log('ERRORS', error );
            }
        )
    }


}