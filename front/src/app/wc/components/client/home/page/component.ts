import {Component, Inject, OnInit, Input} from '@angular/core';
import { AuthenticationService } from '../../../../../applicativeService/authentication/service';
import {GPPDComponent} from "../../../../component/gppd";
import {FilterService} from "../../../../../applicativeService/filter/service";
import { SearchService }         from '../../../../service/search';
import {Router} from "@angular/router";
import {Logged} from "../../../../../applicativeService/authguard/logged";
import {LoggedService} from "../../../../service/logged";
import {LoggerService} from "../../../../../applicativeService/logger/service";
import {PingService} from "../../../../../applicativeService/ping/service"
import {DomainService} from "../../../../service/domain";

@Component({
  selector : 'homePage',
  templateUrl: 'template.html',
    styleUrls: ['style.scss']
})

// home page can depend on subdomain
export class HomePageComponent implements OnInit {

    @Input() subDomain: string;
    private homeBgImageStyle: any;
    public screen: boolean =  false;
    private webPath: string;

    constructor() {}

    ngOnInit() {
        this.webPath = GPPDComponent.updateUrl('/');
        let backgroundImage = "P3.png";
        if (this.subDomain !== "main") {
          backgroundImage = this.subDomain+".jpeg";
        }
        this.homeBgImageStyle = {
          backgroundImage: "url('"+this.webPath+"home/"+backgroundImage+"')"
        };
        this.screen =  GPPDComponent.getScreenSize();
    }


}