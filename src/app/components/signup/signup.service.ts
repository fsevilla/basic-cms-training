import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { BaseHttpService } from 'src/app/globals/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private baseHttp:BaseHttpService
  ) { }

  register(user:any):Promise<any> {
    let url = `${environment.apiUrl}/signup`;

    return this.baseHttp.simplePost(url, user)
      .toPromise();
  }
}
