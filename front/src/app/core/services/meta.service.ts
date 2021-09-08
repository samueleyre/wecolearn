import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private meta: Meta) { }

  public updateThemeColor() {
    this.meta.updateTag(
      {
        name: 'theme-color',
        content: '#501B4A',
      },
    );
  }
}
