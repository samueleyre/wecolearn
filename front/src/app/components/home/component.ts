import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../applicativeService/authentication/service';



@Component({
    templateUrl: 'template.html'
})
 
export class HomeComponent implements OnInit {
    
    constructor(
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
}