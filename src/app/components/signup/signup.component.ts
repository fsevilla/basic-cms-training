import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms'; 

import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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
        Validators.required, Validators.minLength(5)
      ]),
      'code': new FormControl('', [
        Validators.required, Validators.minLength(4)
      ]),
      'email': new FormControl('', [
        Validators.required, Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required, 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
      ]),
      'confirmPassword': new FormControl('',[
        Validators.required
      ])
    }, { validators: [this.matchPassword.bind(this)]});
  }

  private validateSignupForm() {
    return this.signupForm.valid;
  }

  private getFormControlValue(controlName:string):any {
    return this.signupForm.get(controlName).value;
  }

  private getFormValues() {
    let valuesObj:any = {};
    for(let k in this.signupForm.controls) {
      valuesObj[k] = this.getFormControlValue(k);
    }
    return valuesObj;
  }

  matchPassword(): ValidationErrors | null {
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
    if(!this.validateSignupForm()) return;
    const data = this.getFormValues();
    console.log('will submit user: ', data);
    this.signupService.register(data)
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
