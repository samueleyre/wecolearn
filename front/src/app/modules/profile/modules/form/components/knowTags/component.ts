import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-form-knowtags',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileFormKnowTagsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() onChange = new EventEmitter();

  ngOnInit(): void {
    //
  }

  change(knowTags) {
    this.parentForm.controls.know_tags.setValue(knowTags);
    this.onChange.next();
  }
}
