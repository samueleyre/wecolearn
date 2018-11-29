import {Component, OnInit} from '@angular/core';
import {DomainService} from '../../../service/domain';
import {GPPDComponent} from '../../component/gppd';

@Component({
    templateUrl: 'template.html',
    styleUrls: ['style.scss']
})

export class AboutComponent implements OnInit {

  private webPath: string;

  constructor(
  ) {}

  ngOnInit() {
    this.webPath = GPPDComponent.updateUrl('/');
  }


}