import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfileFormModule } from '~/modules/profile/modules/form/form.module';
import { AuthFormModule } from '~/modules/auth/modules/form/form.module';
import { PasswordDifficultyModule } from '~/modules/auth/modules/passwordDifficulty/passwordDifficulty.module';
import { AuthOnboardingMobileComponent } from '~/modules/auth/components/onBoardingComponents/onBoardingMobile/component';
import { MaterialModule } from '~/shared/modules/material/material.module';
import { AuthOnboardingBaseComponent } from '~/modules/auth/components/onBoardingComponents/baseComponent';
import { FooterModule } from '~/shared/modules/footer/footer.module';
import { SharedModule } from '~/shared/shared.module';

import { LandingPartnersComponent } from './components/landing/partners/component';
import { LandingProcessComponent } from './components/landing/process/component';
import { LandingSigninComponent } from './components/landing/signin/component';
import { LandingSigninMobileComponent } from './components/landing/signinMobile/component';
import { SigninMobileComponent } from './components/signin/signinMobile/component';
import { SendPasswordConfirmationEmailMobileComponent } from './components/sendConfirmationEmailMobile/component';
import { AuthOnboardingPageComponent } from './pages/onBoarding/component';
import { AuthOnboardingComponent } from './components/onBoardingComponents/onBoarding/component';
import { AuthRouting } from './auth.routing';
import { ConfirmEmailComponent } from './pages/confirmEmail/component';
import { SigninBaseComponent } from './components/signin/component';
import { ResetPasswordFormPageComponent } from './pages/resetPasswordForm/component';
import { SendPasswordConfirmationEmailComponent } from './components/sendConfirmationEmail/component';
import { SendPasswordConfirmationEmailPageComponent } from './pages/sendConfirmationEmail/component';
import { ResetPasswordFormComponent } from './components/passwordResetForm/component';
import { LandingMobileComponent } from './pages/landing/landing-mobile/landing-mobile.component';
import { LandingDesktopComponent } from './pages/landing/landing-desktop/landing-desktop.component';
import { LandingAndroidComponent } from './pages/landing/landing-android/landing-android.component';
import { LandingPresentationComponent } from './components/landing/landing-presentation/landing-presentation.component';
import { LandingLayoutComponent } from './components/landing/landing-layout/landing-layout.component';
import { SigninDesktopComponent } from './components/signin/signin-desktop/signin-desktop.component';


@NgModule({

  declarations: [
      // pages
    ResetPasswordFormPageComponent,
    SendPasswordConfirmationEmailPageComponent,
    SendPasswordConfirmationEmailMobileComponent,
    SigninBaseComponent,
    SigninMobileComponent,
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
    LandingMobileComponent,
    LandingDesktopComponent,
    LandingAndroidComponent,
    LandingPresentationComponent,
    LandingLayoutComponent,
    SigninDesktopComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRouting,
    ProfileFormModule,
    ReactiveFormsModule,
    AuthFormModule,
    PasswordDifficultyModule,
    MaterialModule,
    FooterModule,
    IonicModule,
    SharedModule,
  ],
})
export class AuthModule {
}
