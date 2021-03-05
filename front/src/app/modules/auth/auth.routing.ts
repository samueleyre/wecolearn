import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingDesktopComponent } from '~/modules/auth/pages/landing/landing-desktop/landing-desktop.component';
import { LandingMobileComponent } from '~/modules/auth/pages/landing/landing-mobile/landing-mobile.component';
import { LandingAndroidComponent } from '~/modules/auth/pages/landing/landing-android/landing-android.component';

import { ConfirmEmailComponent } from './pages/confirmEmail/component';
import { AuthOnboardingPageComponent } from './pages/onBoarding/component';
import { SendPasswordConfirmationEmailPageComponent } from './pages/sendConfirmationEmail/component';
import { ResetPasswordFormPageComponent } from './pages/resetPasswordForm/component';

const routes: Routes = [
  { path: 'signin', data: { surface: ['desktop'], redirectTo: 'mobile' }, component: LandingDesktopComponent },
  { path: 'signin/mobile', data: { surface: ['mobile'], redirectTo: 'android' }, component: LandingMobileComponent },
  { path: 'signin/android', data: { surface: ['android'], redirectTo: '' }, component: LandingAndroidComponent },
  { path: 'subscribe', component: AuthOnboardingPageComponent },
  { path: 'password/email', component: SendPasswordConfirmationEmailPageComponent },
  { path: 'password/reset', component: ResetPasswordFormPageComponent },
  { path: 'confirm', component: ConfirmEmailComponent },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
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
