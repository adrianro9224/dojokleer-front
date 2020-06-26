import {Injectable} from '@angular/core';
import {BodyResponseBase} from "./BodyResponseBase";
import {Config} from "./Config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {CreateAssessmentForm} from "./create-assessment-form";
import {NotificationService} from "./notification.service";
import {Assessment} from "./assessment.object";
import {RegisterStatus} from "./register-status.enum";
import {Observable} from "rxjs";
import {QuestionsCategory} from "./questions-category.object";
import {RegisterAssessmentAnswerForm} from "./register-assessment-answer-form";
import {AssessmentSummaryRadarChart} from "./assessment-summary-radar-chart";

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  notificationService: NotificationService;

  constructor(
    private http: HttpClient,
    notificationService : NotificationService
  ) {
    this.notificationService = notificationService;
  }

  createAssessment(createAssessmentForm: CreateAssessmentForm){
    return this.http.post<BodyResponseBase>(
      Config.API_URL+Config.API_PORT+'/'+Config.API_VERSION+'/assessment',
      createAssessmentForm,
      {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'}),observe: 'response', reportProgress: true, responseType: "json"}
    ).pipe(map(response => {
        switch (response.status) {
          case 200:
            this.notificationService.showMessage(
              "Iniciando Assessment",
              2000,
              'center',
              'top'
            );
            return <Assessment> response.body.data;
        }
      })
    );
  }

  getCategoriesTree(): Observable<QuestionsCategory[]>{
    return this.http.get<BodyResponseBase>(
      Config.API_URL+Config.API_PORT+'/'+Config.API_VERSION+'/questioncategory/status/'+RegisterStatus.ACTIVE,
      {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'}),observe: 'response', reportProgress: true, responseType: "json"}
    ).pipe(
      map(response => {
        switch (response.status) {
          case 200:
            return <QuestionsCategory[]> response.body.data;
        }
      })
    );
  }

  registerAssessmentAnswers(assessmentId: number, registerAssessmentAnswerForm: RegisterAssessmentAnswerForm){
    this.notificationService.showMessage(
      "Registrando resultados",
      2000,
      'center',
      'top'
    );
    return this.http.post<BodyResponseBase>(
      Config.API_URL+Config.API_PORT+'/'+Config.API_VERSION+'/assessment/'+assessmentId+'/answers',
      registerAssessmentAnswerForm,
      {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'}),observe: 'response', reportProgress: true, responseType: "json"}
    ).pipe(
      map(response => {
        switch (response.status) {
          case 200:
            this.notificationService.showMessage(
              "Resultados registrados",
              2000,
              'center',
              'top'
            );
            return <any> response.body.data;
        }
      })
    );
  }

  getAssessmentSummary(assessmentId: number): Observable<AssessmentSummaryRadarChart>{
    return this.http.get<BodyResponseBase>(
      Config.API_URL+Config.API_PORT+'/'+Config.API_VERSION+'/assessment/'+assessmentId+'/summary',
      {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'}),observe: 'response', reportProgress: true, responseType: "json"}
    ).pipe(
      map(response => {
        switch (response.status) {
          case 200:
            return <AssessmentSummaryRadarChart> response.body.data;
        }
      })
    );
  }
}
