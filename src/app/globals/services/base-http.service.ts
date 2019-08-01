import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
    let exception:string = '';
    switch(error.status) {
      case 400:
          exception = 'IncorrectData Exception';
          break;
      case 401:
          exception = 'Authentication Exception';
          break;
      case 403:
          exception = 'Authorization Exception';
          break;
      case 404:
          exception = 'NotFound Exception';
          break;
      case 500:
          exception = 'UnkownError Exception';
          break;
      default:
          exception = 'BaseHttp Exception';
    }
    return throwError({
      message: error.error.error,
      exception,
      status: error.status
    });
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

  get(url:string, params?:any) {
    params = params || {};

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'authorization': this.authenticationService.getToken()
    });

    let parameters = new HttpParams();
    
    for(let k in params) {
      parameters = parameters.set(k, params[k]);
    }

    const httpOptions = {
      headers,
      params: parameters
    }

    console.log('HttpParams', parameters);

    return this.httpClient.get(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
