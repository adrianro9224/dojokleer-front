import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CountryService} from "../country.service";
import {Country} from "../country";

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
  )
  countries: Country[]
  constructor(private router: Router, private countryService: CountryService){ }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(data => this.countries = data);
  }

  saveInit(){
    console.log(this.initAssessmentForm);
    this.router.navigate(['assessment']);
  }
}
