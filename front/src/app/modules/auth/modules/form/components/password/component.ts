import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'auth-form-password',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class AuthFormPasswordComponent implements OnInit {
  @Input() parentForm: FormGroup;

  ngOnInit(): void {
    //
  }
}
