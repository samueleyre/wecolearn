import * as Sentry from '@sentry/angular';

import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import fr from '@angular/common/locales/fr';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { IonicModule } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

// shared modules
import { CoreModule } from '~/core/core.module';
import { MaterialModule } from '~/shared/modules/material/material.module';

// local components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/notFound/component';
// local modules
import { WcRoutingModule } from './app-routing.module';
// shared services
import { HttpApiInterceptor } from './core/services/auth/httpApiInterceptor';
import { getBaseLocation } from './core/services/layout/baseUrl';
import { Router } from '@angular/router';

registerLocaleData(fr);

@NgModule({
  imports: [
    CoreModule,
    BsDropdownModule.forRoot(),
    WcRoutingModule,
    DeviceDetectorModule.forRoot(),
    MaterialModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  providers: [
    Network,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseLocation,
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
  exports: [],
})
export class AppModule {
}
