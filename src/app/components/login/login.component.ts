import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data:any = {
    email: '',
    password: ''
  };

  error:boolean;

  homeLink:string = '/home';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  submitLogin() {
    if(this.data.email && this.data.password) {
      this.loginService.login(this.data)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch(err => {
          this.error = true;
        });
    } else {
    }

  }

  altSubmit(username, password) {
    if(!username.value) {
      username.classList.add('error');
    } else {
      username.classList.remove('error');     
    }

    if(!password.value) {
      password.classList.add('error');     
    } else {
      password.classList.remove('error');     
    }
  }


}
