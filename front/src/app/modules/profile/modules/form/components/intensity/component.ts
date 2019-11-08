import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RANGES } from '~/modules/profile/modules/form/config/range';

@Component({
  selector: 'profile-form-intensity',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class ProfileFormIntensityComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() onChange = new EventEmitter();
  ranges = RANGES;
  stopSubmitting = false;

  ngOnInit(): void {
    //
  }

  change() {
    this.onChange.next();
  }
}
