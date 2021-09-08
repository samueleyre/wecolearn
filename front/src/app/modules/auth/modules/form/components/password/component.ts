import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'auth-form-password',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class AuthFormPasswordComponent {
  @Input() parentForm: FormGroup;
  @Input() showPasswordButton = false;
  @Input() showPWDStrength = false;
  @Input() label = 'Mot de passe';
  @Input() name = 'password';
  @Input() id = 'passwordInput';
  @Input() compareError = false;
  public passwordType: 'text' | 'password' = 'password';

  public onPasswordTypeToggle() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
