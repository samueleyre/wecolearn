import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingDesktopComponent } from '~/modules/auth/pages/landing/landing-desktop/landing-desktop.component';
import { LandingMobileComponent } from '~/modules/auth/pages/landing/landing-mobile/landing-mobile.component';
import { LandingAndroidComponent } from '~/modules/auth/pages/landing/landing-android/landing-android.component';

import { ConfirmEmailComponent } from './components/confirmEmail/component';
import { AuthOnboardingPageComponent } from './pages/onBoarding/component';
import { SendPasswordConfirmationEmailPageComponent } from './pages/sendConfirmationEmail/component';
import { ResetPasswordFormPageComponent } from './pages/resetPasswordForm/component';


const routes: Routes = [
  { path: 'signin', data: { desktopOnly: true }, component: LandingDesktopComponent },
  { path: 'signin/mobile', data: { mobileNavigatorOnly: true }, component: LandingMobileComponent },
  { path: 'signin/android', component: LandingAndroidComponent },
  { path: 'subscribe', component: AuthOnboardingPageComponent },
  { path: 'password/email', component: SendPasswordConfirmationEmailPageComponent },
  { path: 'password/reset', component: ResetPasswordFormPageComponent },
  { path: 'confirm', component: ConfirmEmailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class AuthRouting {
}
