import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  errorMessage:string;

  @ViewChild('modalContent') modalContent;

  constructor(
    private router: Router,
    private modalService: NgbModal,
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
    this.signupService.register(data)
      .then(response => {
        console.log('Created user: ', response);
        // Will log in and auto redirect to home
        // For now, just redirect to log in
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.errorMessage = err.message;
        this.open(this.modalContent);
      });
  }

  open(content) {
    this.modalService.open(content);
  }

}
