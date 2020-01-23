import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-form-geolocation',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileFormGeolocationComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() onChange = new EventEmitter();

  ngOnInit(): void {
    //
  }

  latitudeChange(latitude) {
    this.parentForm.controls.latitude.setValue(latitude);
    this.onChange.next();
  }
  longitudeChange(longitude) {
    this.parentForm.controls.longitude.setValue(longitude);
    this.onChange.next();
  }
}
