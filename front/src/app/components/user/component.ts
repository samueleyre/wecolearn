import { 
        Component, 
        OnInit,
        OnChanges,
        ViewChild,
        Input
   }                              from '@angular/core';
import { NgForm }                 from '@angular/forms';
import { Router }                 from '@angular/router';
import { UserService }            from './../../applicativeService/user/service';
import { User }            from './../../applicativeService/user/model';
import { PopinConfirmService }    from './../../applicativeService/popin/confirm/service';



 
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
        private confirm : PopinConfirmService
    ) {
        this.users = [];
        this.user = new User( null,'','','');
    }
 
    ngOnInit() {
        // reset login status
        
        this.userService.get().subscribe( users => {
                this.users = users;
            }, error => {
                console.log('Error in get comments', error );
            });

    }

   
    submit(f:NgForm) {
        
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
               },
               error => { console.log(error) }
           ); 
        }
        this.user = new User( null, '', '', '' );
        f.resetForm();
    }

    edit( id : number ) {
        for( let i in this.users ) {
            if( this.users[i].id === id ) {
                this.user = this.users[i];
                this.edition = true;
            }
        }
    }

    delete( id : number ) {

        this
        .confirm
        .setMessage( 'Vous allez supprimer un utilisateur, êtes vous sûr ?')
        .subscribe( confirm => {
            if( true == confirm ) {
                this.userService.delete( id ).subscribe(
                    users => this.users = users,
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