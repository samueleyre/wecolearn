import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

import { AppModule } from '~/app.module';
import { EnvEnum } from '~/core/enums/env.enum';

import { environment } from './environments/environment';

if (environment.env === EnvEnum.PRODUCTION || environment.env === EnvEnum.STAGING) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
