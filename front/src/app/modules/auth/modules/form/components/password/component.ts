import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
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
  public passwordType: 'text' | 'password' = 'password';

  public onPasswordTypeToggle() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
