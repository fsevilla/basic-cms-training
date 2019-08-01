import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticationGuard implements CanActivate {

  constructor(
    private router:Router,
    private authenticationService:AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return !this.isAuthenticated();
  }

  isAuthenticated() {
    if(this.authenticationService.isLoggedIn()){
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }
}
