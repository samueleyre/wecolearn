import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './layouts/main/component';
import { ConfirmEmailComponent } from './components/confirmEmail/component';
import { LandingPageComponent } from './pages/landing/component';
import { AuthOnboardingPageComponent } from './pages/onBoarding/component';
import { SendPasswordConfirmationEmailPageComponent } from './pages/sendConfirmationEmail/component';
import { ResetPasswordFormPageComponent } from './pages/resetPasswordForm/component';


const routes: Routes = [
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
