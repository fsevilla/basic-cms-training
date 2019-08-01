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
    username: '',
    password: ''
  };

  error:boolean;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  submitLogin() {
    if(this.data.username && this.data.password) {
      this.loginService.login(this.data.username, this.data.password)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch(err => {
          this.error = true;
        });
    } else {
      console.log('Missing data');
    }
  }


}
