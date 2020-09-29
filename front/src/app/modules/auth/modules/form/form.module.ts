import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { PasswordDifficultyModule } from '../passwordDifficulty/passwordDifficulty.module';
import { AuthFormEmailComponent } from './components/email/component';
import { AuthFormPasswordComponent } from './components/password/component';
import {SharedModule} from "~/shared/shared.module";

@NgModule({

  declarations: [
    AuthFormEmailComponent,
    AuthFormPasswordComponent,
  ],
  exports: [
    AuthFormEmailComponent,
    AuthFormPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    PasswordDifficultyModule,
    SharedModule,
  ],
})
export class AuthFormModule {
}
