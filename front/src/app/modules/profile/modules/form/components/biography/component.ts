import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-form-biography',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileFormBiographyComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() onBlur = new EventEmitter();
  @Input() saving: boolean | null;

  ngOnInit(): void {
    //
  }

  blur() {
    if (this.bioCtrl.dirty) {
      this.onBlur.next();
    }
  }

  public get bioCtrl(): FormControl {
    return <FormControl>this.parentForm.get('biographie');
  }
}
