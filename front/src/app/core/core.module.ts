import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ConfirmDialogComponent } from '~/core/components/dialog/confirm-dialog.component';
import { MainComponent } from '~/core/layouts/dashboard/component';
import { MenuComponent } from '~/core/layouts/menu/component';
import { HeaderMobileComponent } from '~/core/layouts/header-mobile/component';
import { HeaderComponent } from '~/core/layouts/header/component';
import { FooterMobileComponent } from '~/core/layouts/footer-mobile/component';
import { SharedModule } from '~/shared/shared.module';
import { MaterialModule } from '~/shared/modules/material/material.module';
import { ContainerComponent } from '~/core/layouts/main/component';
import { FooterModule } from '~/shared/modules/footer/footer.module';

import { IonicContainerComponent } from './layouts/ionic-container/ionic-container.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,

    // Layouts
    MainComponent,
    MenuComponent,
    HeaderMobileComponent,
    HeaderComponent,
    FooterMobileComponent,
    ContainerComponent,
    IonicContainerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot(),
    MaterialModule,
    SharedModule,
    IonicModule,
    FooterModule,
  ],
  entryComponents: [ConfirmDialogComponent],

})
export class CoreModule {}
