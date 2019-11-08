import { NgModule } from '@angular/core';

import { PasswordStrengthBarComponent } from './components/passwordDifficulty/component';


@NgModule({

  declarations: [
    PasswordStrengthBarComponent,
  ],
  exports: [
    PasswordStrengthBarComponent,
  ],
  imports: [
  ],
  providers: [
  ],
})
export class PasswordDifficultyModule {
}
