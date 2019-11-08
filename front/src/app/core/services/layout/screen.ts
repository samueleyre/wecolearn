import { Injectable } from '@angular/core';

import { WINDOW } from '~/config/window';

@Injectable()
export class ScreenService {
  static isScreenSmall() {
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    const x = w.innerWidth || e.clientWidth || g.clientWidth;

    return x >= WINDOW.small;
  }
}
