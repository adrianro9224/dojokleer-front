import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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

  constructor(private router: Router){ }

  ngOnInit(): void {
  }

  saveInit(){
    console.log(this.initAssessmentForm);
    this.router.navigate(['assessment']);
  }
}
