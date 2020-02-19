import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { navDescriptions, navTitles } from '~/config/navigation/seo.const';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private _titleService: Title, private meta: Meta) { }

  public updateSeoTitleAndTags(route) {
    this._titleService.setTitle(
      `${route in navTitles ? navTitles[route] : 'Wecolearn'}`,
    );

    this.meta.updateTag(
      {
        name: 'description',
        content:
          `${route in navDescriptions ?
            navDescriptions[route] :
            `Mise en relation d'apprenants, pour se motiver à plusieurs !`
            }`,
      },
    );
  }

  // updateIco(domain: string) {
  //   document.getElementById('favicon').setAttribute('href', `${environment.publique}/logo/${domain}.ico`);
  // }
}
