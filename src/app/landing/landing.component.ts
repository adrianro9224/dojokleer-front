import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CountryService} from "../country.service";
import {Country} from "../country";
import {NotificationService} from "../notification.service";
import {AssessmentService} from "../assessment.service";
import {CreateAssessmentForm} from "../create-assessment-form";
import {Assessment} from "../assessment.object";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    trigger('inAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LandingComponent implements OnInit {

  initAssessmentForm = new FormGroup(
    {
      'email': new FormControl('', [Validators.required, Validators.email]),
      'country': new FormControl('', [Validators.required])
    }
  );
  countries: Country[];
  constructor(
    private router: Router,
    private countryService: CountryService,
    private assessmentService: AssessmentService
  ){ }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(data => this.countries = data);
  }

  saveInit() {
    console.log(this.initAssessmentForm);
    this.assessmentService.createAssessment(
      new CreateAssessmentForm(
        this.initAssessmentForm.value.country as number,
        this.initAssessmentForm.value.email as string
      )
    ).subscribe(data => {
      setTimeout(function () {
      }, 1500);
      data = data as Assessment;
      this.router.navigate(['assessment', data.assessmentId]);
    });
  }
}
