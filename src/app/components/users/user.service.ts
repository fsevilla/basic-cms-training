import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseHttpService } from 'src/app/globals/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private baseHttp:BaseHttpService
  ) { }

  getUsers() {
    const url:string = `${environment.apiUrl}${environment.apiPath}users`;

    return this.baseHttp.get(url, { includeType: true })
      .toPromise();
  }
}
