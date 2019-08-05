import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/globals/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private authenticationService:AuthenticationService
  ) { }

  logout() {
    this.authenticationService.clearSession();
  }
}
