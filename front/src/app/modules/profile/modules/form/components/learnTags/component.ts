import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-form-learntags',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})
export class ProfileFormLearnTagsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() onChange = new EventEmitter();

  ngOnInit(): void {
    //
  }

  change(learnTags) {
    this.parentForm.controls.learn_tags.setValue(learnTags);
    this.onChange.next();
  }
}
