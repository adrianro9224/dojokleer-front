import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Config} from './Config';
import {BodyResponseBase} from "./BodyResponseBase";
import {map} from "rxjs/operators";
import {Country} from "./country";
import {RegisterStatus} from "./register-status.enum";
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getAllCountries(){
    return this.http.get<BodyResponseBase>(
      Config.API_URL+Config.API_PORT+'/'+Config.API_VERSION+'/country/status/'+RegisterStatus.ACTIVE,
      {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'}),observe: 'response', reportProgress: true, responseType: "json"}
    ).pipe(map(response => {
      switch (response.status) {
        case 200:
          return <Country[]> response.body.data;
        case 204:
          return [];
        }
      })
    );
  }

}
