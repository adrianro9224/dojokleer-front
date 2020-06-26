import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LandingComponent} from './landing/landing.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {AssessmentComponent} from './assessment/assessment.component';
import {AssessmentSummaryComponent, BottomSheetOverviewSheet} from './assessment-summary/assessment-summary.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {ChartsModule} from "ng2-charts";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotificationService} from "./notification.service";
import {ErrorInterceptorProvider} from "./error-handler.service";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {ShareButtonModule} from "ngx-sharebuttons/button";
import {ShareIconsModule} from "ngx-sharebuttons/icons";
import {ShareButtonsModule} from "ngx-sharebuttons/buttons";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AssessmentComponent,
    AssessmentSummaryComponent,
    BottomSheetOverviewSheet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    ChartsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatListModule,
    ShareButtonModule,
    ShareIconsModule,
    ShareButtonsModule
  ],
  providers: [NotificationService, ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
