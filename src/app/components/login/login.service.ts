import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/globals/services/base-http.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/globals/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private baseHttp: BaseHttpService,
    private authenticationService: AuthenticationService
  ) {
  }

  login(username:string, password:string):Promise<any> {
    let url = `${environment.apiUrl}oauth/token`;

    let data = {
      username,
      password,
      client_id: environment.clientKey,
      client_secret: environment.clientSecret,
      grant_type: environment.grantType
    };

    return this.baseHttp.simplePost(url, data)
      .pipe(
        map(response => {
          this.authenticationService.saveSession(response);
          return response;
        })
      )
      .toPromise();
  }

  
}
