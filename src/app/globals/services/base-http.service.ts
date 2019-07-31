import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor(
    private httpClient:HttpClient,
    private authenticationService:AuthenticationService
  ) { }

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

  get(url:string) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'authorization': this.authenticationService.getToken()
    });

    const httpOptions = {
      headers
    }
    return this.httpClient.get(url, httpOptions);
  }
}
