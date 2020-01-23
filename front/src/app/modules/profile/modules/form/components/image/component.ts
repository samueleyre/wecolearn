import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-form-image',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileFormImageComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() userId;
  @Output() onChange = new EventEmitter();

  uploadError: string | null = null;
  editing = false;

  ngOnInit(): void {
    //
  }

  change() {
    this.onChange.next();
  }

  onComplete(response: any) {
    if (response) {
      this.parentForm.controls.image.setValue(response.response['image']);
      this.uploadError = null;
      this.change();
    }
    this.editing = false;
  }

  onError(status: number) {
    this.uploadError = 'L\'image est trop grande.';
  }
}
