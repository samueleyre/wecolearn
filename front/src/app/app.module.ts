import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';
import fr from '@angular/common/locales/fr';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { MatNativeDateModule, MatSliderModule } from '@angular/material';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { MatIconModule } from '@angular/material/icon';

// feature modules
import { AuthModule } from '~/modules/auth/auth.module';
import { SearchModule } from '~/modules/search/search.module';
// shared modules
import { ProfileImageModule } from '~/modules/profile/modules/profilImage/profileImage.module';
import { HeaderMobileComponent } from '~/core/layouts/header-mobile/component';
import { FooterMobileComponent } from '~/core/layouts/footer-mobile/component';
import { CoreModule } from '~/core/core.module';
import { SharedModule } from '~/shared/shared.module';
import { MaterialModule } from '~/shared/modules/material/material.module';
import { PipesModule } from '~/shared/modules/pipesModule/pipes.module';

// local components
import { MainComponent } from './core/layouts/dashboard/component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/notFound/component';
import { MenuComponent } from './core/layouts/menu/component';
import { HeaderComponent } from './core/layouts/header/component';
import { CommunitiesComponent } from './pages/communities/component';
import { CommunityComponent } from './pages/communities/community/component';
// local modules
import { WcRoutingModule } from './app-routing.module';
// shared components
import { CopyComponent } from './shared/components/copy/component';
import { AutofocusDirective } from './modules/search/directives/input/directive';
// shared services
import { HttpApiInterceptor } from './core/services/auth/httpApiInterceptor';
import { getBaseLocation } from './core/services/layout/baseUrl';
import {MatToolbarModule} from "@angular/material/toolbar";

registerLocaleData(fr);

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    ProfileImageModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    MatNativeDateModule,
    WcRoutingModule,
    DeviceDetectorModule.forRoot(),
    AuthModule,
    SearchModule,
    MatSliderModule,
    MatIconModule,
    MaterialModule,
    PipesModule,
    MatToolbarModule,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    CommunitiesComponent,
    CommunityComponent,
    // Directives
    AutofocusDirective,
    // Layout
    MainComponent,
    MenuComponent,
    HeaderMobileComponent,
    HeaderComponent,
    FooterMobileComponent,
    //  tools
    CopyComponent,
  ],
  providers: [
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
  ],
  bootstrap: [
    AppComponent,
  ],
  exports: [],
})
export class AppModule {
}
