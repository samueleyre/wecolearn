import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-form-biography',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class ProfileFormBiographyComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() onBlur = new EventEmitter();

  ngOnInit(): void {
    //
  }

  blur() {
    if (this.parentForm.controls.biographie.dirty) {
      this.onBlur.next();
    }
  }
}
