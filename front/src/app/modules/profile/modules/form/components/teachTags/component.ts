import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-form-teachtags',
  templateUrl: 'template.html',
  styleUrls: ['./style.scss'],
})

@Injectable()
export class ProfileFormTeachTagsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() onChange = new EventEmitter();

  ngOnInit(): void {
    //
  }

  change(teachTags) {
    this.parentForm.controls.teach_tags.setValue(teachTags);
    this.onChange.next();
  }
}
