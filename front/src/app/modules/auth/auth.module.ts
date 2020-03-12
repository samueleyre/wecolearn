import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatStepperModule } from '@angular/material';

import { ProfileFormModule } from '~/modules/profile/modules/form/form.module';
import { AuthFormModule } from '~/modules/auth/modules/form/form.module';
import { PasswordDifficultyModule } from '~/modules/auth/modules/passwordDifficulty/passwordDifficulty.module';
import { AuthOnboardingMobileComponent } from '~/modules/auth/components/onBoardingComponents/onBoardingMobile/component';
import { ContainerComponent } from '~/modules/auth/layouts/main/component';
import { FooterModule } from '~/shared/modules/footer/footer.module';
import { MaterialModule } from '~/shared/modules/material/material.module';
import { AuthOnboardingBaseComponent } from '~/modules/auth/components/onBoardingComponents/baseComponent';

import { LandingPartnersComponent } from './components/landing/partners/component';
import { LandingProcessComponent } from './components/landing/process/component';
import { LandingSigninComponent } from './components/landing/signin/component';
import { LandingSigninMobileComponent } from './components/landing/signinMobile/component';
import { SigninMobileComponent } from './components/signinMobile/component';
import { SignupMobileComponent } from './components/signupMobile/component';
import { SendPasswordConfirmationEmailMobileComponent } from './components/sendConfirmationEmailMobile/component';
import { AuthOnboardingPageComponent } from './pages/onBoarding/component';
import { AuthOnboardingComponent } from './components/onBoardingComponents/onBoarding/component';
import { AuthRouting } from './auth.routing';
import { ConfirmEmailComponent } from './components/confirmEmail/component';
import { SigninComponent } from './components/signin/component';
import { SlackConnexionComponent } from './components/slackConnexion/component';
import { SignupComponent } from './components/signup/component';
import { LandingPageComponent } from './pages/landing/component';
import { SignupPageComponent } from './pages/subscribe/component';
import { ResetPasswordFormPageComponent } from './pages/resetPasswordForm/component';
import { SendPasswordConfirmationEmailComponent } from './components/sendConfirmationEmail/component';
import { SendPasswordConfirmationEmailPageComponent } from './pages/sendConfirmationEmail/component';
import { ResetPasswordFormComponent } from './components/passwordResetForm/component';


@NgModule({

  declarations: [
      // pages
    LandingPageComponent,
    SignupPageComponent,
    ResetPasswordFormPageComponent,
    SendPasswordConfirmationEmailPageComponent,
    SendPasswordConfirmationEmailMobileComponent,
    SigninComponent,
    SigninMobileComponent,
    SlackConnexionComponent,
    SignupComponent,
    SignupMobileComponent,
    ContainerComponent,
    ResetPasswordFormComponent,
    SendPasswordConfirmationEmailComponent,
    ConfirmEmailComponent,

    LandingPartnersComponent,
    LandingProcessComponent,
    LandingSigninComponent,
    LandingSigninMobileComponent,
    AuthOnboardingComponent,
    AuthOnboardingBaseComponent,
    AuthOnboardingPageComponent,
    AuthOnboardingMobileComponent,

  ],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRouting,
    MatStepperModule,
    ProfileFormModule,
    ReactiveFormsModule,
    AuthFormModule,
    PasswordDifficultyModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FooterModule,
    MaterialModule,
  ],
})
export class AuthModule {
}
