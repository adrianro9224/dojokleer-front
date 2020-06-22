import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private router: Router) { }

  theFormGroup: FormGroup;
  isEditable = false;
  answers: string[] = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec sem consequat (Answer 1)',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec sem consequat (Answer 2)',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec sem consequat (Answer 3)',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec sem consequat (Answer 4)'
  ];

  ngOnInit() {

    this.theFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  saveAssessment(){
    this.router.navigate(['assessment-summary']);
  }
}
