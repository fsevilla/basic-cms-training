import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthenticationService } from 'src/app/globals/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    console.log('Constructed loginService', this.httpClient);
  }

  private handleError(error:HttpErrorResponse) {
    console.log('Service failed:', error)
    return throwError('Exception!');
  }

  login(params:any):Promise<any> {
    let url = `${environment.apiUrl}/login`;

    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });

    const httpOptions = {
      headers
    }

    return this.httpClient.post(url, params, httpOptions)
      .pipe(
        map(response => {
          this.authenticationService.saveSession(response);
          return response;
        }),
        catchError(this.handleError)
      )
      .toPromise();
  }

  
}
