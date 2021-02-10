import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-form-lastname',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileFormLastnameComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() onBlur = new EventEmitter();
  @Input() saving;

  ngOnInit(): void {
    //
  }

  blur() {
    if (this.lastNameControl.dirty) {
      this.onBlur.next();
    }
  }

  public get lastNameControl(): FormControl {
    return <FormControl>this.parentForm.get('last_name');
  }
}
