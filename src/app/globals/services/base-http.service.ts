import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor(
    private httpClient:HttpClient,
    private authenticationService:AuthenticationService
  ) { }

  private handleError(error:HttpErrorResponse) {
    console.error('Global Service failed:', error)
    if(error.status === 401) {
      return throwError('SessionExpired Exception!');
    }
    let message:string = '';
    switch(error.status) {
      case 400:
          message = 'IncorrectData Exception';
          break;
      case 401:
          message = 'Authentication Exception';
          break;
      case 403:
          message = 'Authorization Exception';
          break;
      case 404:
          message = 'NotFound Exception';
          break;
      case 500:
          message = 'UnkownError Exception';
          break;
      default:
          message = 'BaseHttp Exception';
    }
    return throwError(message);
  }

  post(url:string, params:any) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'authorization': this.authenticationService.getToken()
    });

    const httpOptions = {
      headers
    }
    return this.httpClient.post(url, params, httpOptions);
  }
  
  simplePost(url:string, params:any) {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });

    const httpOptions = {
      headers
    }
    return this.httpClient.post(url, params, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  get(url:string) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'authorization': this.authenticationService.getToken()
    });

    const httpOptions = {
      headers
    }
    return this.httpClient.get(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
