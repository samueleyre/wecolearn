import {Component, Inject, OnInit} from '@angular/core';
import { AuthenticationService } from './../../applicativeService/authentication/service';
import {GPPDComponent} from "../../pr/component/gppd";



@Component({
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
})
 
export class HomeComponent implements OnInit {

    private webPath: string;

    constructor(
        private authenticationService: AuthenticationService,
    ) {}

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.webPath = GPPDComponent.updateUrl('');
    }
}