import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-form-lastname',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class ProfileFormLastnameComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() onBlur = new EventEmitter();

  ngOnInit(): void {
    //
  }

  blur() {
    console.log(this.parentForm.controls.last_name.dirty);
    if (this.parentForm.controls.last_name.dirty) {
      this.onBlur.next();
    }
  }
}
