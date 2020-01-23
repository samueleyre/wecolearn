import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-form-firstname',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileFormFirstnameComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() onBlur = new EventEmitter();

  ngOnInit(): void {
    //
  }

  blur() {
    console.log(this.parentForm.controls.first_name.dirty);
    if (this.parentForm.controls.first_name.dirty) {
      this.onBlur.next();
    }
  }
}
