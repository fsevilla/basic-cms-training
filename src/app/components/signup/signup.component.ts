import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms'; 

import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user:any = {
    gender: '',
  };

  signupForm:FormGroup;

  constructor(
    private signupService: SignupService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required
      ]),
      'username': new FormControl('', [
        Validators.required, Validators.minLength(6)
      ]),
      'email': new FormControl('', [
        Validators.required, Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required, 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        this.matchPassword.bind(this)
      ]),
      'confirmPassword': new FormControl('',[
        Validators.required,
        this.matchPassword.bind(this)
      ])
    });
  }

  validateSignupForm() {
    console.log('Form group:', this.signupForm);
    return this.signupForm.valid;
  }

  matchPassword(control: AbstractControl): ValidationErrors | null {
    if(!this.signupForm) return;
    const password = this.signupForm.controls.password.value;
    const confirm = this.signupForm.controls.confirmPassword.value;
    if(password !== confirm) {
      return {
        match: true
      }
    }
    return null;
  }

  registerUser() {
    console.log('Submit form', this.user);
    if(!this.validateSignupForm()) return;
    this.signupService.register(this.user)
      .then(response => {
        console.log('Created user: ', response);
      })
      .catch(err => {
        console.error('Failed to create user', err);
      });
  }

  cancel() {
    console.log('Send back to Login');
  }

}
