import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { MatNativeDateModule, MatSliderModule } from '@angular/material';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { ModalModule } from 'ngx-modialog';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeviceDetectorModule } from 'ngx-device-detector';

// feature modules
import { AuthModule } from '~/modules/auth/auth.module';
import { SearchModule } from '~/modules/search/search.module';
// shared modules
import { SafeUrlPipeModule } from '~/shared/modules/safeUrl/safeUrlPipe.module';
import { CleanService } from '~/shared/services/crud/cleanService';
import { PushSubscriptionService } from '~/shared/components/push-subscription/service';
import { SocketService } from '~/shared/components/socket/service';
import { SocketInit } from '~/shared/components/socket/init';
import { MessagerieService } from '~/shared/services/messagerie/service';
import { ProfileImageModule } from '~/modules/profile/modules/profilImage/profileImage.module';
import { HeaderMobileComponent } from '~/layout/header-mobile/component';
import { MenuMobileService } from '~/shared/services/layout/menu-mobile';
import { MessagesService } from '~/modules/chat/services/messages';
import { Threads } from '~/modules/chat/services/threads';
import { FooterMobileComponent } from '~/layout/footer-mobile/component';
import { FooterMobileService } from '~/shared/services/layout/footer-mobile';
import { CoreModule } from '~/core/core.module';
import { SharedModule } from '~/shared/shared.module';

// local components
import { MainComponent } from './layout/dashboard/component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/notFound/component';
import { MenuComponent } from './layout/menu/component';
import { HeaderComponent } from './layout/header/component';
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
import { UrlService } from './shared/services/url';
import { ScreenService } from './shared/services/layout/screen';
import { PingService } from './shared/services/auth/ping';
import { TokenService } from './shared/services/auth/token';
import { UserService } from './shared/services/user';
import { HeaderBag } from './shared/services/auth/headerBag';
import { HttpApiInterceptor } from './shared/services/auth/httpApiInterceptor';
import { AuthenticationService } from './shared/services/auth/auth';
import { getBaseLocation } from './shared/services/layout/baseUrl';
import { ClientService } from './shared/services/client';
import { DomainService } from './shared/services/domain';
import { TagService } from './shared/services/tag';
import { SeoService } from './shared/services/seo';
import { LoggedService } from './shared/services/loggedService';
import { AuthGuard } from './shared/services/auth/authGuard';
import { MenuService } from './shared/services/layout/menu';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    ProfileImageModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    MatNativeDateModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    WcRoutingModule,
    DeviceDetectorModule.forRoot(),
        // shared modules
    SafeUrlPipeModule,
        // feature modules
    AuthModule,
    SearchModule,
    MatSliderModule, // needed here otherwise slider doesn't work

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
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseLocation,
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    TagService,
    LoggedService,
    ClientService,
    DomainService,
    SeoService,
    MenuService,
    MenuMobileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true,
    },

    AuthenticationService,
    AuthGuard,
    TokenService,
    UserService,
    HeaderBag,
    PingService,
    NotificationService,
    PushSubscriptionService,
    MessagerieService,
    SocketService,
    SocketInit,
    UrlService,
    ScreenService,
    CleanService,
    MessagesService,
    Threads,
    FooterMobileService,

  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
