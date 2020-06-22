import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {AssessmentComponent} from "./assessment/assessment.component";
import {AssessmentSummaryComponent} from "./assessment-summary/assessment-summary.component";


const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'assessment', component: AssessmentComponent},
  {path: 'assessment-summary', component: AssessmentSummaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
