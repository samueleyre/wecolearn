import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { MatNativeDateModule, MatSliderModule } from '@angular/material';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { MatIconModule } from '@angular/material/icon';

// feature modules
import { AuthModule } from '~/modules/auth/auth.module';
import { SearchModule } from '~/modules/search/search.module';
// shared modules
import { SafeUrlPipeModule } from '~/shared/modules/safeUrl/safeUrlPipe.module';
import { CleanService } from '~/core/services/crud/cleanService';
import { PushSubscriptionService } from '~/shared/components/push-subscription/service';
import { MessagerieService } from '~/core/services/messagerie/service';
import { ProfileImageModule } from '~/modules/profile/modules/profilImage/profileImage.module';
import { HeaderMobileComponent } from '~/core/layouts/header-mobile/component';
import { MenuMobileService } from '~/core/services/layout/menu-mobile';
import { MessagesService } from '~/modules/chat/services/messages';
import { Threads } from '~/modules/chat/services/threads';
import { FooterMobileComponent } from '~/core/layouts/footer-mobile/component';
import { FooterMobileService } from '~/core/services/layout/footer-mobile';
import { CoreModule } from '~/core/core.module';
import { SharedModule } from '~/shared/shared.module';

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
import { SafeHtmlPipe } from './shared/pipes/safeHtmlPipe/pipe';
import { AutofocusDirective } from './modules/search/directives/input/directive';
import { NotificationService } from './shared/components/notification/service';
// shares services
import { HttpApiInterceptor } from './core/services/auth/httpApiInterceptor';
import { getBaseLocation } from './core/services/layout/baseUrl';

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
    // shared modules
    SafeUrlPipeModule,
    // feature modules
    AuthModule,
    SearchModule,
    MatSliderModule,
    MatIconModule,
    // needed here otherwise slider doesn't work

  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    CommunitiesComponent,
    CommunityComponent,

        // Pipes
    SafeHtmlPipe,


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
  // todo: no need for providers anymore
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
})
export class AppModule {
}
