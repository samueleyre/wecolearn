import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'auth-form-email',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class AuthFormEmailComponent {
  @Input() parentForm: FormGroup;
  @Input() error: string = null;
}
