import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  saveSession(data) {
    sessionStorage.setItem('session', JSON.stringify(data));
  }

  getSession() {
    return sessionStorage.getItem('session') ? JSON.parse(sessionStorage.getItem('session')) : null;
  }

  getToken():string {
    const session = this.getSession();
    return session ? `${session.token_type} ${session.access_token}` : '';
  }

  isLoggedIn():boolean {
    return !!this.getSession();
  }
}
