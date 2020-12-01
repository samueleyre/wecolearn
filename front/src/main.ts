import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'hammerjs';

import { AppModule } from '~/app.module';
import { EnvEnum } from '~/core/enums/env.enum';

import { environment } from './environments/environment';

if (environment.env === EnvEnum.PRODUCTION || environment.env === EnvEnum.STAGING) {
  Sentry.init({
    dsn: 'https://ce81fb50d71e4df6b537456700e5e575@o485043.ingest.sentry.io/5539084',
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: [environment.origin],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
