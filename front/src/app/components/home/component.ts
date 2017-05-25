import { Component, OnInit } from '@angular/core';
 
 
@Component({
    moduleId: module.id,
    templateUrl: 'template.html'
})
 
export class HomeComponent implements OnInit {
    
    constructor(private userService: UserService) { }
 
    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }
 
}