import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-form-firstname',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileFormFirstnameComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() onBlur = new EventEmitter();
  @Input() saving;

  ngOnInit(): void {}

  blur() {
    if (this.firstNameControl.dirty) {
      this.onBlur.next();
    }
  }

  get firstNameControl(): FormControl {
    return <FormControl>this.parentForm.get('first_name');
  }
}
