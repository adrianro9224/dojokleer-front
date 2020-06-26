import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {NotificationService} from "./notification.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorHandlerService implements HttpInterceptor{

  notificationService: NotificationService;
  statusCode: number;

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(errResponse => {
            if (errResponse instanceof HttpErrorResponse) {
              this.statusCode = errResponse.status;
                switch (this.statusCode) {
                  case 400:
                    if (errResponse.error !== null) {
                      if(errResponse.error.errors !== null){
                          this.notificationService.showMessages(
                            errResponse.error.errors.map(value => value.message).reverse(),
                            3000,
                            'center',
                            'top'
                          );
                      }else {
                        this.notificationService.showMessage(
                          errResponse.error.message,
                          3000,
                          'center',
                          'top'
                        );
                      }
                    }
                    break;
                  case 500:
                    this.notificationService.showMessage(
                      'Houston we have a problem',
                      1000,
                      'center',
                      'top'
                    );
                  break;
                  default:

                }
              return throwError(errResponse);
            }
          }
        ));
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHandlerService,
  multi: true,
};


