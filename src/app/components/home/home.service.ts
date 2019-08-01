import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseHttpService } from 'src/app/globals/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private baseHttp:BaseHttpService
  ) {
  }

  private handleError(error:HttpErrorResponse) {
    console.error('Home Service failed:', error)
    if(error.status === 401) {
      console.log('Los datos estan mal!');
    }
    return throwError('HomeException!');
  }

  getContent():Promise<any> {
    const url = `${environment.apiUrl}${environment.apiPath}user`;

    return this.baseHttp.get(url)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }
}
