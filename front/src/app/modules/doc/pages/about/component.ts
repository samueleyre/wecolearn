import { Component, OnInit } from '@angular/core';

import { UrlService } from '~/shared/services/url';


@Component({
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

export class AboutComponent implements OnInit {
  public webPath: string;

  constructor(
  ) {
    //
  }

  ngOnInit() {
    this.webPath = UrlService.updateUrl('/');
  }
}
