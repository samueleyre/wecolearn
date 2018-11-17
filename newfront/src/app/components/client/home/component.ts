import {Component, OnInit} from '@angular/core';
import {DomainService} from '../../../service/domain';

@Component({
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
})

export class HomeComponent implements OnInit {

    private subDomain: string = null;

    constructor(
        private domainService: DomainService,

    ) {}

    ngOnInit() {

      this.subDomain = this.domainService.getSubDomain();

    }


}