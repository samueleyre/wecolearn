import { 
        Component, 
        OnInit,
        OnChanges 
   }                              from '@angular/core';
import { Router }                 from '@angular/router';
import { UserService }            from './../../user/service';
import { EmmitterService }        from './../../emmitter/service';
}
 
@Component({
    templateUrl: 'template.html'
})
 
export class UserComponent implements OnInit, OnChanges {
    
    users: User[];
    edit: boolean = false;
    user : User;
    
    @Input() listId: string;
    @Input() editId: string;

    constructor(
        private router: Router,
        private userService : UserService, 
        private emmitterService : EmmitterService,
    ) { }
 
    ngOnInit() {
        // reset login status
        this.userService.get().subscribe( users => {
                this.users = users;
            }, error => {
                console.log('Error in get comments', error );
            });
    }

    ngOnChange( change: any ) {
        emmitterService.get('LIST_CHANGE').subscribe(
            (users:User[]) => this.users = users
        ) 
    }
 
    submit() {
        
        if(this.edit) {
            this.userService.patch( this.user ).subscribe( 
                    users => this.users = users, 
                    error => { console.log(error) }
                );
            this.edit = false; 
        } else {
           this.userService.post( this.user).subscribe() {
               users => this.users = users,
               error => { console.log(error)
              }
           }
        }
    }

    edit( id : number ) {
        this.edit = true;
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